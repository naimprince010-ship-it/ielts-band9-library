import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Tag, Percent, Calendar, ToggleLeft, ToggleRight, Loader2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  description: string;
  is_active: boolean;
  expires_at: string | null;
  usage_limit: number | null;
  usage_count: number;
  created_at: string;
}

const STORAGE_KEY = 'ielts_coupons';

function getCouponsFromStorage(): Coupon[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [
    { id: '1', code: 'WELCOME20', discount: 20, type: 'percent', description: '20% off your first purchase', is_active: true, expires_at: null, usage_limit: null, usage_count: 0, created_at: new Date().toISOString() },
    { id: '2', code: 'IELTS50', discount: 50, type: 'fixed', description: '৳50 off any plan', is_active: true, expires_at: null, usage_limit: 100, usage_count: 12, created_at: new Date().toISOString() },
    { id: '3', code: 'STUDENT15', discount: 15, type: 'percent', description: '15% student discount', is_active: true, expires_at: null, usage_limit: null, usage_count: 45, created_at: new Date().toISOString() },
    { id: '4', code: 'NEWYEAR25', discount: 25, type: 'percent', description: '25% New Year special', is_active: true, expires_at: '2025-01-31', usage_limit: 50, usage_count: 8, created_at: new Date().toISOString() },
  ];
}

function saveCouponsToStorage(coupons: Coupon[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
}

export function CouponManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    type: 'percent' as 'percent' | 'fixed',
    description: '',
    is_active: true,
    expires_at: '',
    usage_limit: '',
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      if (isSupabaseConfigured() && supabase) {
        const { data, error } = await supabase
          .from('coupons')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Supabase coupons table not found, using localStorage');
          setCoupons(getCouponsFromStorage());
        } else {
          setCoupons(data || []);
        }
      } else {
        setCoupons(getCouponsFromStorage());
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      setCoupons(getCouponsFromStorage());
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (coupon?: Coupon) => {
    if (coupon) {
      setEditingCoupon(coupon);
      setFormData({
        code: coupon.code,
        discount: coupon.discount.toString(),
        type: coupon.type,
        description: coupon.description,
        is_active: coupon.is_active,
        expires_at: coupon.expires_at ? coupon.expires_at.split('T')[0] : '',
        usage_limit: coupon.usage_limit?.toString() || '',
      });
    } else {
      setEditingCoupon(null);
      setFormData({
        code: '',
        discount: '',
        type: 'percent',
        description: '',
        is_active: true,
        expires_at: '',
        usage_limit: '',
      });
    }
    setError('');
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.code || !formData.discount || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const couponData = {
        code: formData.code.toUpperCase(),
        discount: parseFloat(formData.discount),
        type: formData.type,
        description: formData.description,
        is_active: formData.is_active,
        expires_at: formData.expires_at || null,
        usage_limit: formData.usage_limit ? parseInt(formData.usage_limit) : null,
      };

      if (isSupabaseConfigured() && supabase) {
        if (editingCoupon) {
          const { error } = await supabase
            .from('coupons')
            .update(couponData)
            .eq('id', editingCoupon.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('coupons')
            .insert([{ ...couponData, usage_count: 0 }]);

          if (error) throw error;
        }
      } else {
        const currentCoupons = getCouponsFromStorage();
        if (editingCoupon) {
          const index = currentCoupons.findIndex(c => c.id === editingCoupon.id);
          if (index !== -1) {
            currentCoupons[index] = { ...currentCoupons[index], ...couponData };
          }
        } else {
          currentCoupons.unshift({
            id: Date.now().toString(),
            ...couponData,
            usage_count: 0,
            created_at: new Date().toISOString(),
          });
        }
        saveCouponsToStorage(currentCoupons);
      }

      setSuccess(editingCoupon ? 'Coupon updated successfully!' : 'Coupon created successfully!');
      setIsDialogOpen(false);
      fetchCoupons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to save coupon:', err);
      setError('Failed to save coupon. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) return;

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('coupons')
          .delete()
          .eq('id', coupon.id);

        if (error) throw error;
      } else {
        const currentCoupons = getCouponsFromStorage();
        const filtered = currentCoupons.filter(c => c.id !== coupon.id);
        saveCouponsToStorage(filtered);
      }

      setSuccess('Coupon deleted successfully!');
      fetchCoupons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Failed to delete coupon:', err);
      setError('Failed to delete coupon. Please try again.');
    }
  };

  const handleToggleActive = async (coupon: Coupon) => {
    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase
          .from('coupons')
          .update({ is_active: !coupon.is_active })
          .eq('id', coupon.id);

        if (error) throw error;
      } else {
        const currentCoupons = getCouponsFromStorage();
        const index = currentCoupons.findIndex(c => c.id === coupon.id);
        if (index !== -1) {
          currentCoupons[index].is_active = !currentCoupons[index].is_active;
        }
        saveCouponsToStorage(currentCoupons);
      }

      fetchCoupons();
    } catch (err) {
      console.error('Failed to toggle coupon:', err);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activeCoupons = coupons.filter(c => c.is_active);
  const inactiveCoupons = coupons.filter(c => !c.is_active);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Coupon Management
            </CardTitle>
            <CardDescription>
              Create and manage discount coupons for your pricing plans
            </CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Coupon
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : coupons.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No coupons yet. Create your first coupon!
          </div>
        ) : (
          <div className="space-y-6">
            {activeCoupons.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <ToggleRight className="h-5 w-5 text-green-500" />
                  Active Coupons ({activeCoupons.length})
                </h3>
                <div className="grid gap-4">
                  {activeCoupons.map((coupon) => (
                    <div key={coupon.id} className="border rounded-lg p-4 bg-green-50 border-green-200">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <code className="bg-white px-3 py-1 rounded font-bold text-lg">{coupon.code}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyCode(coupon.code)}
                              className="h-8 w-8 p-0"
                            >
                              {copiedCode === coupon.code ? (
                                <Check className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                            <Badge className={coupon.type === 'percent' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'}>
                              {coupon.type === 'percent' ? (
                                <><Percent className="h-3 w-3 mr-1" />{coupon.discount}% off</>
                              ) : (
                                <>৳{coupon.discount} off</>
                              )}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{coupon.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                            {coupon.expires_at && (
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Expires: {new Date(coupon.expires_at).toLocaleDateString()}
                              </span>
                            )}
                            {coupon.usage_limit && (
                              <span>
                                Usage: {coupon.usage_count}/{coupon.usage_limit}
                              </span>
                            )}
                            {!coupon.usage_limit && (
                              <span>Used: {coupon.usage_count} times</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(coupon)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleActive(coupon)}
                            className="text-amber-600"
                          >
                            <ToggleLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(coupon)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {inactiveCoupons.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <ToggleLeft className="h-5 w-5 text-gray-400" />
                  Inactive Coupons ({inactiveCoupons.length})
                </h3>
                <div className="grid gap-4">
                  {inactiveCoupons.map((coupon) => (
                    <div key={coupon.id} className="border rounded-lg p-4 bg-gray-50 border-gray-200 opacity-60">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <code className="bg-white px-3 py-1 rounded font-bold text-lg">{coupon.code}</code>
                            <Badge variant="outline">
                              {coupon.type === 'percent' ? `${coupon.discount}% off` : `৳${coupon.discount} off`}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{coupon.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenDialog(coupon)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleActive(coupon)}
                            className="text-green-600"
                          >
                            <ToggleRight className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(coupon)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
              <DialogDescription>
                {editingCoupon ? 'Update the coupon details below.' : 'Fill in the details to create a new discount coupon.'}
              </DialogDescription>
            </DialogHeader>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g., SUMMER25"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount *</Label>
                  <Input
                    id="discount"
                    type="number"
                    placeholder="e.g., 20"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: 'percent' | 'fixed') => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percent">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (৳)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  placeholder="e.g., Summer sale discount"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expires_at">Expiry Date (optional)</Label>
                  <Input
                    id="expires_at"
                    type="date"
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage_limit">Usage Limit (optional)</Label>
                  <Input
                    id="usage_limit"
                    type="number"
                    placeholder="Unlimited"
                    value={formData.usage_limit}
                    onChange={(e) => setFormData({ ...formData, usage_limit: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="is_active">Active (customers can use this coupon)</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? (
                  <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving...</>
                ) : (
                  editingCoupon ? 'Update Coupon' : 'Create Coupon'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

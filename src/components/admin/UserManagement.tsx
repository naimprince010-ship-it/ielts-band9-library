import { useState, useEffect } from 'react';
import { Users, Shield, ShieldCheck, Crown, Copy, Check, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'instructor';
  subscription_status: 'free' | 'premium';
  created_at: string;
}

const SQL_QUERIES = {
  makeAdmin: (email: string) => `UPDATE users SET role = 'admin' WHERE email = '${email}';`,
  makeInstructor: (email: string) => `UPDATE users SET role = 'instructor' WHERE email = '${email}';`,
  removeAdmin: (email: string) => `UPDATE users SET role = 'user' WHERE email = '${email}';`,
  makePremium: (email: string) => `UPDATE users SET subscription_status = 'premium' WHERE email = '${email}';`,
  removePremium: (email: string) => `UPDATE users SET subscription_status = 'free' WHERE email = '${email}';`,
  listAdmins: `SELECT * FROM users WHERE role = 'admin';`,
  listPremium: `SELECT * FROM users WHERE subscription_status = 'premium';`,
  listAllUsers: `SELECT * FROM users ORDER BY created_at DESC;`,
};

export function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedQuery, setCopiedQuery] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to load users: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin' | 'instructor') => {
    if (!supabase) return;

    setUpdating(userId);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      setMessage({ type: 'success', text: `User role updated to ${newRole}` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to update role: ${err.message}` });
    } finally {
      setUpdating(null);
    }
  };

  const updateSubscription = async (userId: string, newStatus: 'free' | 'premium', hours?: number) => {
    if (!supabase) return;

    setUpdating(userId);
    setMessage(null);

    try {
      const updates: any = { subscription_status: newStatus };
      if (hours) {
         updates.premium_until = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
      } else if (newStatus === 'free') {
         updates.premium_until = null;
      }

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, subscription_status: newStatus } : u));
      setMessage({ type: 'success', text: `Subscription updated to ${newStatus}${hours ? ` for ${hours} hours` : ''}` });
    } catch (err: any) {
      setMessage({ type: 'error', text: `Failed to update subscription: ${err.message}` });
    } finally {
      setUpdating(null);
    }
  };

  const copyToClipboard = (text: string, queryName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuery(queryName);
    setTimeout(() => setCopiedQuery(null), 2000);
  };

  const adminCount = users.filter(u => u.role === 'admin').length;
  const premiumCount = users.filter(u => u.subscription_status === 'premium').length;

  return (
    <div className="space-y-6">
      {message && (
        <Alert className={message.type === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}>
          <AlertDescription className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Instructors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">
              {users.filter(u => u.role === 'instructor').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{adminCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Premium Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{premiumCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user roles and subscriptions
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={fetchUsers} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found. Users will appear here after they sign up.
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userData) => (
                      <TableRow key={userData.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{userData.name || 'No Name'}</p>
                            <p className="text-xs text-gray-500">{userData.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={userData.role === 'admin' ? 'default' : userData.role === 'instructor' ? 'outline' : 'secondary'} 
                            className={cn(
                              "capitalize",
                              userData.role === 'instructor' ? "border-amber-200 text-amber-700 bg-amber-50" : ""
                            )}
                          >
                            {userData.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={userData.subscription_status === 'premium' ? 'default' : 'outline'}
                            className={cn(
                              "capitalize",
                              userData.subscription_status === 'premium' ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none" : ""
                            )}
                          >
                            {userData.subscription_status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {new Date(userData.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {userData.role === 'instructor' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-amber-200 text-amber-700"
                                onClick={() => updateUserRole(userData.id, 'user')}
                                disabled={updating === userData.id}
                              >
                                <Users className="h-4 w-4 mr-1" />
                                Remove Instructor
                              </Button>
                            ) : userData.role === 'user' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => updateUserRole(userData.id, 'instructor')}
                                disabled={updating === userData.id}
                              >
                                <GraduationCap className="h-4 w-4 mr-1" />
                                Make Instructor
                              </Button>
                            ) : null}

                            {userData.role === 'user' || userData.role === 'instructor' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => updateUserRole(userData.id, 'admin')}
                                disabled={updating === userData.id}
                              >
                                <Shield className="h-4 w-4 mr-1" />
                                Make Admin
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => updateUserRole(userData.id, 'user')}
                                disabled={updating === userData.id}
                              >
                                <ShieldCheck className="h-4 w-4 mr-1" />
                                Remove Admin
                              </Button>
                            )}
                            {userData.subscription_status === 'free' ? (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => {
                                   const hoursStr = window.prompt("How many hours for this Custom Trial Pass? (Leave blank for permanent Premium)");
                                   if (hoursStr === null) return;
                                   const hours = parseInt(hoursStr);
                                   updateSubscription(userData.id, 'premium', isNaN(hours) ? undefined : hours);
                                }}
                                disabled={updating === userData.id}
                              >
                                <Crown className="h-4 w-4 mr-1" />
                                Grant Premium / Pass
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => updateSubscription(userData.id, 'free')}
                                disabled={updating === userData.id}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Remove Premium
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.map((userData) => (
                  <Card key={userData.id} className="border-slate-100 shadow-sm overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                            {(userData.name || userData.email)[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{userData.name || 'No Name'}</p>
                            <p className="text-xs text-slate-500">{userData.email}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                          <Badge 
                            variant={userData.role === 'admin' ? 'default' : userData.role === 'instructor' ? 'outline' : 'secondary'} 
                            className={cn(
                              "text-[10px] uppercase font-bold tracking-wider",
                              userData.role === 'instructor' ? "border-amber-200 text-amber-700 bg-amber-50" : ""
                            )}
                          >
                            {userData.role}
                          </Badge>
                          <Badge 
                            variant={userData.subscription_status === 'premium' ? 'default' : 'outline'}
                            className={cn(
                              "text-[10px] uppercase font-bold tracking-wider",
                              userData.subscription_status === 'premium' ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-none" : ""
                            )}
                          >
                            {userData.subscription_status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 pb-4 border-b border-slate-50">
                        <span>Joined {new Date(userData.created_at).toLocaleDateString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {userData.role === 'instructor' ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl border-amber-200 text-amber-700"
                            onClick={() => updateUserRole(userData.id, 'user')}
                            disabled={updating === userData.id}
                          >
                            <Users className="h-3.5 w-3.5 mr-1.5" /> Remove Instructor
                          </Button>
                        ) : userData.role === 'user' ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl"
                            onClick={() => updateUserRole(userData.id, 'instructor')}
                            disabled={updating === userData.id}
                          >
                            <GraduationCap className="h-3.5 w-3.5 mr-1.5" /> Make Instructor
                          </Button>
                        ) : null}

                        {(userData.role === 'user' || userData.role === 'instructor') ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl"
                            onClick={() => updateUserRole(userData.id, 'admin')}
                            disabled={updating === userData.id}
                          >
                            <Shield className="h-3.5 w-3.5 mr-1.5" /> Make Admin
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl"
                            onClick={() => updateUserRole(userData.id, 'user')}
                            disabled={updating === userData.id}
                          >
                            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Revoke Admin
                          </Button>
                        )}
                        
                        {userData.subscription_status === 'free' ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl"
                            onClick={() => {
                               const hoursStr = window.prompt("Hours for Trial Pass? (Leave empty for permanent)");
                               if (hoursStr === null) return;
                               const hours = parseInt(hoursStr);
                               updateSubscription(userData.id, 'premium', isNaN(hours) ? undefined : hours);
                            }}
                            disabled={updating === userData.id}
                          >
                            <Crown className="h-3.5 w-3.5 mr-1.5" /> Grant Premium / Pass
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs h-9 rounded-xl"
                            onClick={() => updateSubscription(userData.id, 'free')}
                            disabled={updating === userData.id}
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1.5" /> Revoke Premium
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-slate-50 border-slate-200">
        <CardHeader>
          <CardTitle className="text-slate-800">SQL Query Reference</CardTitle>
          <CardDescription>
            Use these queries directly in Supabase SQL Editor if needed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">Make User Instructor</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.makeInstructor('user@example.com'), 'makeInstructor')}
                >
                  {copiedQuery === 'makeInstructor' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.makeInstructor('user@example.com')}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">Make User Admin</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.makeAdmin('user@example.com'), 'makeAdmin')}
                >
                  {copiedQuery === 'makeAdmin' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.makeAdmin('user@example.com')}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">Remove Admin Role</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.removeAdmin('user@example.com'), 'removeAdmin')}
                >
                  {copiedQuery === 'removeAdmin' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.removeAdmin('user@example.com')}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">Make User Premium</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.makePremium('user@example.com'), 'makePremium')}
                >
                  {copiedQuery === 'makePremium' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.makePremium('user@example.com')}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">List All Admins</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.listAdmins, 'listAdmins')}
                >
                  {copiedQuery === 'listAdmins' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.listAdmins}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">List All Premium Users</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.listPremium, 'listPremium')}
                >
                  {copiedQuery === 'listPremium' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.listPremium}
              </code>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-slate-700">List All Users</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(SQL_QUERIES.listAllUsers, 'listAllUsers')}
                >
                  {copiedQuery === 'listAllUsers' ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-xs bg-slate-100 p-2 rounded block overflow-x-auto">
                {SQL_QUERIES.listAllUsers}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Users, Shield, ShieldCheck, Crown, Copy, Check, Loader2, RefreshCw } from 'lucide-react';
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

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  subscription_status: 'free' | 'premium';
  created_at: string;
}

const SQL_QUERIES = {
  makeAdmin: (email: string) => `UPDATE users SET role = 'admin' WHERE email = '${email}';`,
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

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
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

  const updateSubscription = async (userId: string, newStatus: 'free' | 'premium') => {
    if (!supabase) return;

    setUpdating(userId);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('users')
        .update({ subscription_status: newStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers(users.map(u => u.id === userId ? { ...u, subscription_status: newStatus } : u));
      setMessage({ type: 'success', text: `Subscription updated to ${newStatus}` });
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
            <div className="overflow-x-auto">
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
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}>
                          {user.role === 'admin' ? (
                            <><ShieldCheck className="h-3 w-3 mr-1" /> Admin</>
                          ) : (
                            <><Shield className="h-3 w-3 mr-1" /> User</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={user.subscription_status === 'premium' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}>
                          {user.subscription_status === 'premium' ? (
                            <><Crown className="h-3 w-3 mr-1" /> Premium</>
                          ) : (
                            'Free'
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {user.role === 'admin' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserRole(user.id, 'user')}
                            disabled={updating === user.id}
                          >
                            {updating === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Remove Admin'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateUserRole(user.id, 'admin')}
                            disabled={updating === user.id}
                            className="text-purple-600 border-purple-300 hover:bg-purple-50"
                          >
                            {updating === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Make Admin'}
                          </Button>
                        )}
                        {user.subscription_status === 'premium' ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateSubscription(user.id, 'free')}
                            disabled={updating === user.id}
                          >
                            {updating === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Remove Premium'}
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateSubscription(user.id, 'premium')}
                            disabled={updating === user.id}
                            className="text-amber-600 border-amber-300 hover:bg-amber-50"
                          >
                            {updating === user.id ? <Loader2 className="h-3 w-3 animate-spin" /> : 'Make Premium'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Ticket, Plus, Pencil, Trash2, Loader2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;
type Coupon = Tables<'coupons'>;

const Admin: React.FC = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();

  const [products, setProducts] = useState<Product[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  // Product form state
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    price: '',
    original_price: '',
    category: '',
    image_url: '',
    in_stock: true,
  });

  // Coupon form state
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discount_percent: '',
    expires_at: '',
    is_active: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: language === 'en' ? 'Access Denied' : 'تم الرفض',
        description: language === 'en' ? 'You do not have admin privileges.' : 'ليس لديك صلاحيات المسؤول.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate, toast, language]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, couponsRes] = await Promise.all([
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('coupons').select('*').order('created_at', { ascending: false }),
      ]);

      if (productsRes.data) setProducts(productsRes.data);
      if (couponsRes.data) setCoupons(couponsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Product handlers
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name_en: productForm.name_en,
      name_ar: productForm.name_ar,
      description_en: productForm.description_en || null,
      description_ar: productForm.description_ar || null,
      price: parseFloat(productForm.price),
      original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
      category: productForm.category,
      image_url: productForm.image_url || null,
      in_stock: productForm.in_stock,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        
        if (error) throw error;
        toast({ title: language === 'en' ? 'Product updated!' : 'تم تحديث المنتج!' });
      } else {
        const { error } = await supabase.from('products').insert(productData);
        if (error) throw error;
        toast({ title: language === 'en' ? 'Product created!' : 'تم إنشاء المنتج!' });
      }
      
      setProductDialogOpen(false);
      resetProductForm();
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      name_en: '',
      name_ar: '',
      description_en: '',
      description_ar: '',
      price: '',
      original_price: '',
      category: '',
      image_url: '',
      in_stock: true,
    });
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name_en: product.name_en,
      name_ar: product.name_ar,
      description_en: product.description_en || '',
      description_ar: product.description_ar || '',
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category: product.category,
      image_url: product.image_url || '',
      in_stock: product.in_stock ?? true,
    });
    setProductDialogOpen(true);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm(language === 'en' ? 'Delete this product?' : 'حذف هذا المنتج؟')) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: language === 'en' ? 'Product deleted' : 'تم حذف المنتج' });
      fetchData();
    }
  };

  // Coupon handlers
  const handleCouponSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const couponData = {
      code: couponForm.code.toUpperCase(),
      discount_percent: parseInt(couponForm.discount_percent),
      expires_at: couponForm.expires_at || null,
      is_active: couponForm.is_active,
    };

    try {
      if (editingCoupon) {
        const { error } = await supabase
          .from('coupons')
          .update(couponData)
          .eq('id', editingCoupon.id);
        
        if (error) throw error;
        toast({ title: language === 'en' ? 'Coupon updated!' : 'تم تحديث الكوبون!' });
      } else {
        const { error } = await supabase.from('coupons').insert(couponData);
        if (error) throw error;
        toast({ title: language === 'en' ? 'Coupon created!' : 'تم إنشاء الكوبون!' });
      }
      
      setCouponDialogOpen(false);
      resetCouponForm();
      fetchData();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const resetCouponForm = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      discount_percent: '',
      expires_at: '',
      is_active: true,
    });
  };

  const editCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discount_percent: coupon.discount_percent.toString(),
      expires_at: coupon.expires_at ? new Date(coupon.expires_at).toISOString().split('T')[0] : '',
      is_active: coupon.is_active ?? true,
    });
    setCouponDialogOpen(true);
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm(language === 'en' ? 'Delete this coupon?' : 'حذف هذا الكوبون؟')) return;
    
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: language === 'en' ? 'Coupon deleted' : 'تم حذف الكوبون' });
      fetchData();
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground">
            {language === 'en' ? 'Admin Panel' : 'لوحة التحكم'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Sign Out' : 'تسجيل الخروج'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              {language === 'en' ? 'Products' : 'المنتجات'}
            </TabsTrigger>
            <TabsTrigger value="coupons" className="flex items-center gap-2">
              <Ticket className="w-4 h-4" />
              {language === 'en' ? 'Coupons' : 'الكوبونات'}
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {language === 'en' ? 'Manage Products' : 'إدارة المنتجات'}
              </h2>
              <Dialog open={productDialogOpen} onOpenChange={(open) => {
                setProductDialogOpen(open);
                if (!open) resetProductForm();
              }}>
                <DialogTrigger asChild>
                  <Button variant="neon-filled">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Add Product' : 'إضافة منتج'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct 
                        ? (language === 'en' ? 'Edit Product' : 'تعديل المنتج')
                        : (language === 'en' ? 'Add Product' : 'إضافة منتج')
                      }
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name (EN)</Label>
                        <Input
                          value={productForm.name_en}
                          onChange={(e) => setProductForm({ ...productForm, name_en: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Name (AR)</Label>
                        <Input
                          value={productForm.name_ar}
                          onChange={(e) => setProductForm({ ...productForm, name_ar: e.target.value })}
                          required
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Description (EN)</Label>
                        <Textarea
                          value={productForm.description_en}
                          onChange={(e) => setProductForm({ ...productForm, description_en: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description (AR)</Label>
                        <Textarea
                          value={productForm.description_ar}
                          onChange={(e) => setProductForm({ ...productForm, description_ar: e.target.value })}
                          dir="rtl"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Original Price</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={productForm.original_price}
                          onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={productForm.image_url}
                        onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={productForm.in_stock}
                        onCheckedChange={(checked) => setProductForm({ ...productForm, in_stock: checked })}
                      />
                      <Label>In Stock</Label>
                    </div>
                    <Button type="submit" variant="neon-filled" className="w-full">
                      {editingProduct ? (language === 'en' ? 'Update' : 'تحديث') : (language === 'en' ? 'Create' : 'إنشاء')}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                >
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name_en}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{product.name_en}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-primary font-medium">${product.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${product.in_stock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => editProduct(product)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              {products.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'en' ? 'No products yet' : 'لا توجد منتجات بعد'}
                </p>
              )}
            </div>
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {language === 'en' ? 'Manage Coupons' : 'إدارة الكوبونات'}
              </h2>
              <Dialog open={couponDialogOpen} onOpenChange={(open) => {
                setCouponDialogOpen(open);
                if (!open) resetCouponForm();
              }}>
                <DialogTrigger asChild>
                  <Button variant="neon-filled">
                    <Plus className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'Add Coupon' : 'إضافة كوبون'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCoupon 
                        ? (language === 'en' ? 'Edit Coupon' : 'تعديل الكوبون')
                        : (language === 'en' ? 'Add Coupon' : 'إضافة كوبون')
                      }
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCouponSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Code</Label>
                      <Input
                        value={couponForm.code}
                        onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                        placeholder="e.g., SAVE20"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Discount (%)</Label>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={couponForm.discount_percent}
                        onChange={(e) => setCouponForm({ ...couponForm, discount_percent: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expires At (optional)</Label>
                      <Input
                        type="date"
                        value={couponForm.expires_at}
                        onChange={(e) => setCouponForm({ ...couponForm, expires_at: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={couponForm.is_active}
                        onCheckedChange={(checked) => setCouponForm({ ...couponForm, is_active: checked })}
                      />
                      <Label>Active</Label>
                    </div>
                    <Button type="submit" variant="neon-filled" className="w-full">
                      {editingCoupon ? (language === 'en' ? 'Update' : 'تحديث') : (language === 'en' ? 'Create' : 'إنشاء')}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {coupons.map((coupon) => (
                <motion.div
                  key={coupon.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground font-mono">{coupon.code}</h3>
                    <p className="text-sm text-muted-foreground">
                      {coupon.discount_percent}% off
                      {coupon.expires_at && ` • Expires: ${new Date(coupon.expires_at).toLocaleDateString()}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs ${coupon.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {coupon.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => editCoupon(coupon)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteCoupon(coupon.id)}>
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              {coupons.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  {language === 'en' ? 'No coupons yet' : 'لا توجد كوبونات بعد'}
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;

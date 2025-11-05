import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Save, X, ImageIcon, Link as LinkIcon, Package } from 'lucide-react';

interface ProductEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productForm: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    image: string;
    productUrl: string;
    status: string;
  };
  onFormChange: (updates: Partial<ProductEditDialogProps['productForm']>) => void;
  onSave: () => void;
  loading: boolean;
  isRTL: boolean;
}

export const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  isOpen,
  onClose,
  productForm,
  onFormChange,
  onSave,
  loading,
  isRTL,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {isRTL ? 'تعديل المنتج' : 'Edit Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              {isRTL ? 'اسم المنتج' : 'Product Name'}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={productForm.name}
              onChange={(e) => onFormChange({ name: e.target.value })}
              placeholder={isRTL ? 'أدخل اسم المنتج' : 'Enter product name'}
              required
              className="bg-input-background"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {isRTL ? 'الوصف' : 'Description'}
            </Label>
            <Textarea
              id="description"
              value={productForm.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder={isRTL ? 'أدخل وصف المنتج' : 'Enter product description'}
              rows={4}
              className="bg-input-background resize-none"
            />
          </div>

          {/* Price & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="flex items-center gap-2">
                {isRTL ? 'السعر (EGP)' : 'Price (EGP)'}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={productForm.price}
                onChange={(e) => onFormChange({ price: e.target.value })}
                placeholder={isRTL ? 'السعر' : 'Price'}
                required
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                {isRTL ? 'الفئة' : 'Category'}
              </Label>
              <Input
                id="category"
                value={productForm.category}
                onChange={(e) => onFormChange({ category: e.target.value })}
                placeholder={isRTL ? 'مثال: قمصان، أحذية' : 'e.g., Shirts, Shoes'}
                className="bg-input-background"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              {isRTL ? 'رابط الصورة' : 'Image URL'}
            </Label>
            <Input
              id="image"
              type="url"
              value={productForm.image}
              onChange={(e) => onFormChange({ image: e.target.value })}
              placeholder={isRTL ? 'https://example.com/image.jpg' : 'https://example.com/image.jpg'}
              className="bg-input-background"
            />
            {productForm.image && (
              <div className="mt-2 p-2 border border-border rounded-lg">
                <img 
                  src={productForm.image} 
                  alt="Preview" 
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }}
                />
              </div>
            )}
          </div>

          {/* Product URL */}
          <div className="space-y-2">
            <Label htmlFor="productUrl" className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              {isRTL ? 'رابط المنتج (اختياري)' : 'Product URL (Optional)'}
            </Label>
            <Input
              id="productUrl"
              type="url"
              value={productForm.productUrl}
              onChange={(e) => onFormChange({ productUrl: e.target.value })}
              placeholder={isRTL ? 'https://your-store.com/product' : 'https://your-store.com/product'}
              className="bg-input-background"
            />
            <p className="text-xs text-muted-foreground">
              {isRTL 
                ? 'أضف رابط المنتج الأصلي من موقعك أو متجرك' 
                : 'Add the original product link from your website or store'}
            </p>
          </div>

          {/* Status Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-secondary/10">
            <div className="space-y-0.5">
              <Label htmlFor="status" className="text-base">
                {isRTL ? 'حالة المنتج' : 'Product Status'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {isRTL 
                  ? 'تفعيل أو إيقاف عرض المنتج' 
                  : 'Enable or disable product visibility'}
              </p>
            </div>
            <Switch
              id="status"
              checked={productForm.status === 'active'}
              onCheckedChange={(checked) => onFormChange({ status: checked ? 'active' : 'inactive' })}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              {isRTL ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button
              type="submit"
              disabled={loading || !productForm.name || !productForm.price}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading 
                ? (isRTL ? 'جاري الحفظ...' : 'Saving...') 
                : (isRTL ? 'حفظ التغييرات' : 'Save Changes')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

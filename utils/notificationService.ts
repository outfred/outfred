// Notification Service - Auto-send notifications on important events

import { addNotification } from '../pages/Notifications';

export const notificationService = {
  // Send welcome notification after registration
  sendWelcomeNotification: (userId: string, userName: string, language: 'ar' | 'en') => {
    addNotification(userId, {
      type: 'system',
      title: language === 'ar' ? '🎉 مرحباً بك في Outfred!' : '🎉 Welcome to Outfred!',
      message: language === 'ar' 
        ? `مرحباً ${userName}! نحن سعداء بانضمامك. ابدأ باستكشاف الأزياء باستخدام AI الذكي.`
        : `Hello ${userName}! We're excited to have you. Start exploring fashion with smart AI.`,
      icon: 'success'
    });
  },

  // Send email verification notification
  sendVerificationNotification: (userId: string, language: 'ar' | 'en', verificationCode: string) => {
    addNotification(userId, {
      type: 'email',
      title: language === 'ar' ? '✉️ تأكيد البريد الإلكتروني' : '✉️ Email Verification',
      message: language === 'ar' 
        ? `تم إرسال كود التفعيل إلى بريدك الإلكتروني. الكود: ${verificationCode}`
        : `Verification code sent to your email. Code: ${verificationCode}`,
      icon: 'mail'
    });
  },

  // Send password reset notification
  sendPasswordResetNotification: (userId: string, language: 'ar' | 'en') => {
    addNotification(userId, {
      type: 'system',
      title: language === 'ar' ? '🔐 تم تغيير كلمة المرور' : '🔐 Password Changed',
      message: language === 'ar' 
        ? 'تم تغيير كلمة المرور بنجاح. إذا لم تقم بهذا الإجراء، يرجى الاتصال بالدعم.'
        : 'Your password was changed successfully. If you didn\'t do this, please contact support.',
      icon: 'success'
    });
  },

  // Send subscription upgrade notification
  sendSubscriptionUpgradeNotification: (
    userId: string, 
    language: 'ar' | 'en', 
    planName: string
  ) => {
    addNotification(userId, {
      type: 'payment',
      title: language === 'ar' ? '💎 تم ترقية الباقة' : '💎 Subscription Upgraded',
      message: language === 'ar' 
        ? `تم ترقية باقتك إلى ${planName} بنجاح!`
        : `Your subscription was upgraded to ${planName} successfully!`,
      icon: 'success'
    });
  },

  // Send low search quota warning
  sendLowSearchQuotaWarning: (userId: string, language: 'ar' | 'en', remaining: number) => {
    addNotification(userId, {
      type: 'system',
      title: language === 'ar' ? '⚠️ نفذت عمليات البحث تقريباً' : '⚠️ Low Search Quota',
      message: language === 'ar' 
        ? `تبقى لك ${remaining} عملية بحث فقط. قم بترقية باقتك للمزيد!`
        : `You have only ${remaining} searches left. Upgrade your plan for more!`,
      icon: 'clock'
    });
  },

  // Send merchant approval notification
  sendMerchantApprovalNotification: (
    userId: string, 
    language: 'ar' | 'en', 
    approved: boolean
  ) => {
    addNotification(userId, {
      type: 'merchant',
      title: approved 
        ? (language === 'ar' ? '✅ تمت الموافقة على متجرك' : '✅ Store Approved')
        : (language === 'ar' ? '❌ تم رفض طلبك' : '❌ Request Rejected'),
      message: approved
        ? (language === 'ar' ? 'تهانينا! تمت الموافقة على متجرك. يمكنك البدء في إضافة المنتجات.' : 'Congratulations! Your store was approved. You can start adding products.')
        : (language === 'ar' ? 'نعتذر، تم رفض طلبك. يرجى المحاولة مرة أخرى.' : 'Sorry, your request was rejected. Please try again.'),
      icon: approved ? 'success' : 'error'
    });
  },

  // Send product view notification to merchant
  sendProductViewNotification: (
    userId: string, 
    language: 'ar' | 'en', 
    productName: string
  ) => {
    addNotification(userId, {
      type: 'merchant',
      title: language === 'ar' ? '👁️ منتجك يتم مشاهدته!' : '👁️ Your Product is Being Viewed!',
      message: language === 'ar' 
        ? `تتم مشاهدة منتج "${productName}" الآن`
        : `Product "${productName}" is being viewed now`,
      icon: 'bell'
    });
  },

  // Send SMTP test success notification (for admin)
  sendSMTPTestNotification: (userId: string, language: 'ar' | 'en', success: boolean) => {
    addNotification(userId, {
      type: 'system',
      title: success
        ? (language === 'ar' ? '✅ نجح اختبار SMTP' : '✅ SMTP Test Successful')
        : (language === 'ar' ? '❌ فشل اختبار SMTP' : '❌ SMTP Test Failed'),
      message: success
        ? (language === 'ar' ? 'إعدادات البريد الإلكتروني تعمل بشكل صحيح!' : 'Email settings are working correctly!')
        : (language === 'ar' ? 'فشل إرسال البريد. تحقق من إعدادات SMTP.' : 'Failed to send email. Check SMTP settings.'),
      icon: success ? 'success' : 'error'
    });
  }
};

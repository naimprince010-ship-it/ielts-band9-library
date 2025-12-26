import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, AlertTriangle, CreditCard, BookOpen, Scale } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'December 23, 2025';

  const sections = [
    {
      icon: BookOpen,
      title: '1. Acceptance of Terms',
      content: `By accessing and using IELTS Band 9 Materials Library ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.

These terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 13 years of age, or if you are under 13, that you have obtained parental consent to use the Service.`
    },
    {
      icon: Shield,
      title: '2. Description of Service',
      content: `IELTS Band 9 Materials Library provides online educational content and tools for IELTS exam preparation, including but not limited to:

• Vocabulary lessons and flashcards
• Grammar tutorials and exercises
• Writing practice and AI-powered feedback
• Speaking practice materials
• Mock tests and quizzes
• Progress tracking and analytics

We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.`
    },
    {
      icon: CreditCard,
      title: '3. Subscription and Payment',
      content: `Some features of our Service require a paid subscription. By subscribing to a paid plan, you agree to the following:

Payment Terms: All payments are processed through bKash. You must provide accurate payment information and complete the payment process as instructed.

Subscription Activation: Your subscription will be activated within 1-2 hours after we verify your payment. For urgent requests, contact our support team via WhatsApp.

Refund Policy: We offer a 7-day money-back guarantee for new subscribers. If you are not satisfied with our Service, contact our support team within 7 days of your initial purchase for a full refund.

Cancellation: You may cancel your subscription at any time. Your access to premium features will continue until the end of your current billing period.

Price Changes: We reserve the right to change our subscription prices. Any price changes will be communicated to existing subscribers at least 30 days in advance.`
    },
    {
      icon: FileText,
      title: '4. User Accounts',
      content: `To access certain features of the Service, you must create an account. You agree to:

• Provide accurate, current, and complete information during registration
• Maintain the security of your password and account
• Notify us immediately of any unauthorized access to your account
• Accept responsibility for all activities that occur under your account

We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.`
    },
    {
      icon: AlertTriangle,
      title: '5. Prohibited Conduct',
      content: `You agree not to:

• Share your account credentials with others
• Copy, distribute, or reproduce our content without permission
• Use automated systems or bots to access the Service
• Attempt to gain unauthorized access to our systems
• Use the Service for any illegal or unauthorized purpose
• Interfere with or disrupt the Service or servers
• Upload malicious code or content
• Harass, abuse, or harm other users
• Misrepresent your identity or affiliation

Violation of these terms may result in immediate termination of your account without refund.`
    },
    {
      icon: Scale,
      title: '6. Intellectual Property',
      content: `All content on IELTS Band 9 Materials Library, including but not limited to text, graphics, logos, images, audio clips, and software, is the property of IELTS Band 9 Materials Library or its content suppliers and is protected by international copyright laws.

You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without our express written permission.

Your use of the Service does not grant you ownership of any intellectual property rights in our content or the Service itself.`
    }
  ];

  const additionalSections = [
    {
      title: '7. Disclaimer of Warranties',
      content: `The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that:

• The Service will be uninterrupted or error-free
• The content will be accurate or complete
• Any errors will be corrected
• The Service will meet your specific requirements

We make no guarantees regarding your IELTS exam results. Your success depends on your own effort and dedication to studying.`
    },
    {
      title: '8. Limitation of Liability',
      content: `To the maximum extent permitted by law, IELTS Band 9 Materials Library shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or other intangible losses, resulting from:

• Your use or inability to use the Service
• Any unauthorized access to your account
• Any errors or omissions in our content
• Any third-party conduct on the Service`
    },
    {
      title: '9. Indemnification',
      content: `You agree to indemnify and hold harmless IELTS Band 9 Materials Library, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service or violation of these Terms.`
    },
    {
      title: '10. Changes to Terms',
      content: `We reserve the right to modify these Terms of Service at any time. We will notify users of significant changes by posting a notice on our website or sending an email to registered users.

Your continued use of the Service after any changes constitutes your acceptance of the new Terms. If you do not agree to the modified terms, you should discontinue use of the Service.`
    },
    {
      title: '11. Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of Bangladesh, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of Bangladesh.`
    },
    {
      title: '12. Contact Information',
      content: `If you have any questions about these Terms of Service, please contact us:

Email: support@ieltstree.com
WhatsApp: +880 1712-345678
Website: www.ieltstree.com/contact`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <FileText className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="mb-8 bg-amber-50 border-amber-200">
          <CardContent className="p-6">
            <p className="text-amber-800">
              Please read these Terms of Service carefully before using IELTS Band 9 Materials Library. 
              By using our Service, you agree to be bound by these terms.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-4">
                  <section.icon className="h-6 w-6 text-indigo-600" />
                  {section.title}
                </h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}

          {additionalSections.map((section, index) => (
            <Card key={index} className="border">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h2>
                <div className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gray-100">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              By using IELTS Band 9 Materials Library, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms of Service.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

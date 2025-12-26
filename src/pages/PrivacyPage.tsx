import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, Share2, UserCheck, Bell, Mail } from 'lucide-react';

export default function PrivacyPage() {
  const lastUpdated = 'December 23, 2025';

  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: `We collect information to provide and improve our Service. The types of information we collect include:

Personal Information:
• Name and email address (when you create an account)
• Google account information (if you sign in with Google)
• Payment information (bKash transaction details)

Usage Information:
• Lessons viewed and completed
• Quiz scores and performance data
• Study time and progress statistics
• Device information and browser type
• IP address and general location

Content You Provide:
• Essays submitted for writing feedback
• Quiz answers and responses
• Bookmarks and saved content
• Profile information and preferences`
    },
    {
      icon: Database,
      title: '2. How We Use Your Information',
      content: `We use the information we collect for the following purposes:

Service Delivery:
• To create and manage your account
• To provide access to our educational content
• To track your learning progress
• To personalize your learning experience

Communication:
• To send important service updates
• To respond to your inquiries and support requests
• To send promotional content (with your consent)

Improvement:
• To analyze usage patterns and improve our Service
• To develop new features and content
• To fix bugs and technical issues

Legal Compliance:
• To comply with applicable laws and regulations
• To protect our rights and prevent fraud`
    },
    {
      icon: Lock,
      title: '3. Data Security',
      content: `We take the security of your data seriously and implement appropriate measures to protect it:

Technical Measures:
• Secure HTTPS encryption for all data transmission
• Secure password hashing and storage
• Regular security audits and updates
• Access controls and authentication systems

Organizational Measures:
• Limited access to personal data on a need-to-know basis
• Employee training on data protection
• Incident response procedures

While we strive to protect your information, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.`
    },
    {
      icon: Share2,
      title: '4. Information Sharing',
      content: `We do not sell your personal information. We may share your information in the following circumstances:

Service Providers:
• We may share data with third-party service providers who help us operate our Service (e.g., hosting, analytics, payment processing)
• These providers are bound by confidentiality agreements

Legal Requirements:
• We may disclose information if required by law or in response to valid legal requests
• We may share information to protect our rights, safety, or property

Business Transfers:
• In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner

With Your Consent:
• We may share your information for other purposes with your explicit consent`
    },
    {
      icon: UserCheck,
      title: '5. Your Rights and Choices',
      content: `You have the following rights regarding your personal information:

Access and Portability:
• You can access your account information at any time
• You can request a copy of your data

Correction:
• You can update your profile information through your account settings
• You can contact us to correct any inaccurate information

Deletion:
• You can request deletion of your account and associated data
• Some information may be retained for legal or legitimate business purposes

Communication Preferences:
• You can opt out of promotional emails at any time
• You can manage notification preferences in your account settings

To exercise these rights, contact us at support@ieltstree.com`
    },
    {
      icon: Bell,
      title: '6. Cookies and Tracking',
      content: `We use cookies and similar technologies to enhance your experience:

Essential Cookies:
• Required for the Service to function properly
• Used for authentication and security

Analytics Cookies:
• Help us understand how users interact with our Service
• Used to improve our content and features

Preference Cookies:
• Remember your settings and preferences
• Provide a personalized experience

You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our Service.`
    }
  ];

  const additionalSections = [
    {
      title: '7. Data Retention',
      content: `We retain your personal information for as long as necessary to provide our Service and fulfill the purposes described in this policy:

• Account information is retained while your account is active
• Learning progress data is retained to provide continuous service
• Payment records are retained as required by law
• You can request deletion of your data at any time

After account deletion, some information may be retained in anonymized form for analytics purposes.`
    },
    {
      title: '8. Children\'s Privacy',
      content: `Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. We will take steps to delete such information from our systems.

Users between 13 and 18 years of age should have parental consent before using our Service.`
    },
    {
      title: '9. International Data Transfers',
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.

By using our Service, you consent to the transfer of your information to Bangladesh and other countries where we operate. We take appropriate measures to ensure your data is protected in accordance with this Privacy Policy.`
    },
    {
      title: '10. Third-Party Links',
      content: `Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.

We encourage you to read the privacy policies of any third-party sites you visit. This Privacy Policy applies only to our Service.`
    },
    {
      title: '11. Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by:

• Posting a notice on our website
• Sending an email to registered users
• Updating the "Last updated" date at the top of this policy

Your continued use of the Service after any changes constitutes your acceptance of the updated Privacy Policy.`
    },
    {
      title: '12. Contact Us',
      content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

Email: support@ieltstree.com
WhatsApp: +880 1712-345678
Website: www.ieltstree.com/contact

We will respond to your inquiry within 30 days.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        <Card className="mb-8 bg-indigo-50 border-indigo-200">
          <CardContent className="p-6">
            <p className="text-indigo-800">
              Your privacy is important to us. This Privacy Policy explains how IELTS Band 9 Materials Library 
              collects, uses, and protects your personal information when you use our Service.
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

        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-800 mb-2">Questions About Your Privacy?</h3>
                <p className="text-green-700">
                  If you have any questions or concerns about how we handle your data, 
                  please don't hesitate to contact us at support@ieltstree.com or via WhatsApp at +880 1712-345678.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

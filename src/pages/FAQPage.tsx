import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, BookOpen, CreditCard, User, Settings, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    category: 'Getting Started',
    icon: BookOpen,
    questions: [
      {
        q: 'What is IELTS Band 9 Materials Library?',
        a: 'IELTS Band 9 Materials Library is a comprehensive self-study platform designed to help you prepare for the IELTS exam. We offer vocabulary lessons, grammar tutorials, writing practice, speaking exercises, and mock tests to help you achieve your target band score.'
      },
      {
        q: 'How do I start learning?',
        a: 'Simply create a free account, take our diagnostic test to assess your current level, and start with the recommended lessons. You can also browse our vocabulary and grammar sections directly from the navigation menu.'
      },
      {
        q: 'Is there a mobile app available?',
        a: 'Our website is fully responsive and works great on mobile devices. You can add it to your home screen for an app-like experience. A dedicated mobile app is coming soon!'
      },
      {
        q: 'What IELTS band score can I achieve with this platform?',
        a: 'Our materials are designed to help you achieve Band 7 and above. With consistent practice and dedication, many of our students have achieved Band 8 and even Band 9 scores.'
      }
    ]
  },
  {
    category: 'Account & Subscription',
    icon: User,
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click the "Get Started" button on the homepage or navigate to the Sign Up page. You can register using your email address or sign in with Google for quick access.'
      },
      {
        q: 'What is included in the free plan?',
        a: 'The free plan includes access to basic vocabulary and grammar lessons, limited quiz attempts, and progress tracking. Premium features like advanced lessons, writing feedback, and mock tests require a subscription.'
      },
      {
        q: 'How do I upgrade to Premium?',
        a: 'Go to the Pricing page and select your preferred plan. We accept bKash payments for Bangladesh users. After payment, send your transaction ID to our support team for instant activation.'
      },
      {
        q: 'Can I cancel my subscription?',
        a: 'Yes, you can cancel your subscription at any time. Your premium access will continue until the end of your billing period. Contact our support team for assistance.'
      }
    ]
  },
  {
    category: 'Payment & Billing',
    icon: CreditCard,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We currently accept bKash payments for users in Bangladesh. Send your payment to our bKash number and share the transaction ID with our support team for activation.'
      },
      {
        q: 'How long does it take to activate my subscription?',
        a: 'Once you send your payment and transaction ID, our team typically activates your subscription within 1-2 hours during business hours. For urgent requests, contact us via WhatsApp.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'We offer a 7-day money-back guarantee for new subscribers. If you are not satisfied with our service, contact our support team within 7 days of purchase for a full refund.'
      },
      {
        q: 'Are there any discounts available?',
        a: 'Yes! We offer discounts for students and group subscriptions. Check our Pricing page for current offers or contact support for special discount codes.'
      }
    ]
  },
  {
    category: 'Features & Content',
    icon: Settings,
    questions: [
      {
        q: 'How many vocabulary words are available?',
        a: 'Our library contains over 7,000 IELTS-relevant vocabulary words organized by topics like Education, Environment, Health, Technology, and more. Each word includes definitions, examples, and audio pronunciation.'
      },
      {
        q: 'What is the Spaced Repetition System?',
        a: 'Our flashcard system uses spaced repetition to help you memorize vocabulary more effectively. Words you find difficult will appear more frequently, while words you know well will appear less often.'
      },
      {
        q: 'How does the Writing Checker work?',
        a: 'Submit your IELTS Task 1 or Task 2 essays and receive instant AI-powered feedback on grammar, vocabulary, coherence, and task achievement. You will also get an estimated band score and suggestions for improvement.'
      },
      {
        q: 'Can I track my progress?',
        a: 'Yes! Our Progress Dashboard shows your study streak, lessons completed, quiz scores, skill progress, and personalized recommendations. You can also earn achievements and certificates.'
      }
    ]
  },
  {
    category: 'Technical Support',
    icon: MessageCircle,
    questions: [
      {
        q: 'The website is not loading properly. What should I do?',
        a: 'Try clearing your browser cache and cookies, then refresh the page. If the issue persists, try using a different browser or device. Contact our support team if the problem continues.'
      },
      {
        q: 'I forgot my password. How can I reset it?',
        a: 'Click "Forgot Password" on the login page and enter your email address. You will receive a password reset link within a few minutes. Check your spam folder if you do not see the email.'
      },
      {
        q: 'My progress is not saving. What should I do?',
        a: 'Make sure you are logged in to your account. Progress is saved automatically when you complete lessons and quizzes. If issues persist, try logging out and back in, or contact support.'
      },
      {
        q: 'How do I contact support?',
        a: 'You can reach our support team via WhatsApp at +880 1712-345678, email at support@ieltstree.com, or through our Contact Us page. We typically respond within 24 hours.'
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about IELTS Band 9 Materials Library. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-2 border-gray-100">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <category.icon className="h-6 w-6 text-indigo-600" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`} className="border-b last:border-b-0">
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50">
                        <span className="font-medium text-gray-900">{faq.q}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-indigo-50 border-indigo-200">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
              <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  WhatsApp Support
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

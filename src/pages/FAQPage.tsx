import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, BookOpen, CreditCard, User, Settings, MessageCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
}

const categoryIcons: Record<string, typeof BookOpen> = {
  'Getting Started': BookOpen,
  'Account & Subscription': User,
  'Payment & Billing': CreditCard,
  'Features & Content': Settings,
  'Technical Support': MessageCircle,
};

const defaultFaqs = [
  { category: 'Getting Started', questions: [
    { q: 'What is IELTS Band 9 Materials Library?', a: 'IELTS Band 9 Materials Library is a comprehensive self-study platform designed to help you prepare for the IELTS exam.' },
    { q: 'How do I start learning?', a: 'Simply create a free account, take our diagnostic test to assess your current level, and start with the recommended lessons.' },
    { q: 'Is there a mobile app available?', a: 'Our website is fully responsive and works great on mobile devices. A dedicated mobile app is coming soon!' },
    { q: 'What IELTS band score can I achieve?', a: 'Our materials are designed to help you achieve Band 7 and above.' }
  ]},
  { category: 'Account & Subscription', questions: [
    { q: 'How do I create an account?', a: 'Click the "Get Started" button on the homepage or navigate to the Sign Up page.' },
    { q: 'What is included in the free plan?', a: 'The free plan includes access to basic vocabulary and grammar lessons, limited quiz attempts, and progress tracking.' },
    { q: 'How do I upgrade to Premium?', a: 'Go to the Pricing page and select your preferred plan. We accept bKash payments.' },
    { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel your subscription at any time.' }
  ]},
  { category: 'Payment & Billing', questions: [
    { q: 'What payment methods do you accept?', a: 'We currently accept bKash payments for users in Bangladesh.' },
    { q: 'How long does it take to activate my subscription?', a: 'Our team typically activates your subscription within 1-2 hours during business hours.' },
    { q: 'Do you offer refunds?', a: 'We offer a 7-day money-back guarantee for new subscribers.' },
    { q: 'Are there any discounts available?', a: 'Yes! We offer discounts for students and group subscriptions.' }
  ]},
  { category: 'Features & Content', questions: [
    { q: 'How many vocabulary words are available?', a: 'Our library contains over 7,000 IELTS-relevant vocabulary words.' },
    { q: 'What is the Spaced Repetition System?', a: 'Our flashcard system uses spaced repetition to help you memorize vocabulary more effectively.' },
    { q: 'How does the Writing Checker work?', a: 'Submit your essays and receive instant AI-powered feedback.' },
    { q: 'Can I track my progress?', a: 'Yes! Our Progress Dashboard shows your study streak, lessons completed, and more.' }
  ]},
  { category: 'Technical Support', questions: [
    { q: 'The website is not loading properly. What should I do?', a: 'Try clearing your browser cache and cookies, then refresh the page.' },
    { q: 'I forgot my password. How can I reset it?', a: 'Click "Forgot Password" on the login page and enter your email address.' },
    { q: 'My progress is not saving. What should I do?', a: 'Make sure you are logged in to your account.' },
    { q: 'How do I contact support?', a: 'You can reach our support team via WhatsApp, email, or through our Contact Us page.' }
  ]}
];

export default function FAQPage() {
  const [faqs, setFaqs] = useState<{ category: string; questions: { q: string; a: string }[] }[]>(defaultFaqs);
  const [loading, setLoading] = useState(true);
  const [whatsappLink, setWhatsappLink] = useState('https://wa.me/8801712345678');

  useEffect(() => {
    const fetchFaqs = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('faq_items')
          .select('*')
          .eq('is_published', true)
          .order('category')
          .order('sort_order');

        if (error) throw error;

        if (data && data.length > 0) {
          const groupedFaqs = data.reduce((acc: Record<string, { q: string; a: string }[]>, item: FAQItem) => {
            if (!acc[item.category]) {
              acc[item.category] = [];
            }
            acc[item.category].push({ q: item.question, a: item.answer });
            return acc;
          }, {} as Record<string, { q: string; a: string }[]>);

          const faqArray = Object.entries(groupedFaqs).map(([category, questions]) => ({
            category,
            questions: questions as { q: string; a: string }[],
          }));

          setFaqs(faqArray);
        }

        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'whatsapp_link')
          .single();

        if (settingsData) {
          setWhatsappLink(settingsData.value);
        }
      } catch (err) {
        console.error('Failed to fetch FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

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
          {faqs.map((category, categoryIndex) => {
            const IconComponent = categoryIcons[category.category] || HelpCircle;
            return (
              <Card key={categoryIndex} className="border-2 border-gray-100">
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <IconComponent className="h-6 w-6 text-indigo-600" />
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
            );
          })}
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
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
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

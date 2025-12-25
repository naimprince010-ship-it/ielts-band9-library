import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link2, 
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

interface SocialShareProps {
  title: string;
  text: string;
  url?: string;
  hashtags?: string[];
}

export function SocialShare({ title, text, url = 'https://www.ieltstree.com', hashtags = ['IELTS', 'EnglishLearning'] }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  const encodedHashtags = hashtags.join(',');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=${encodedHashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {'share' in navigator && (
          <DropdownMenuItem onClick={handleNativeShare} className="gap-2 cursor-pointer">
            <Share2 className="h-4 w-4" />
            Share...
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleShare('facebook')} className="gap-2 cursor-pointer">
          <Facebook className="h-4 w-4 text-blue-600" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('twitter')} className="gap-2 cursor-pointer">
          <Twitter className="h-4 w-4 text-sky-500" />
          Twitter / X
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('linkedin')} className="gap-2 cursor-pointer">
          <Linkedin className="h-4 w-4 text-blue-700" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare('whatsapp')} className="gap-2 cursor-pointer">
          <MessageCircle className="h-4 w-4 text-green-500" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ShareAchievement({ 
  achievementName, 
  description 
}: { 
  achievementName: string; 
  description: string;
}) {
  const shareText = `I just unlocked "${achievementName}" on IELTS Tree! ${description}`;
  
  return (
    <SocialShare 
      title={`Achievement Unlocked: ${achievementName}`}
      text={shareText}
      hashtags={['IELTS', 'Achievement', 'EnglishLearning']}
    />
  );
}

export function ShareProgress({ 
  lessonsCompleted, 
  streak,
  estimatedBand 
}: { 
  lessonsCompleted: number;
  streak: number;
  estimatedBand: string;
}) {
  const shareText = `My IELTS Tree Progress: ${lessonsCompleted} lessons completed, ${streak}-day streak, estimated band ${estimatedBand}!`;
  
  return (
    <SocialShare 
      title="My IELTS Progress"
      text={shareText}
      hashtags={['IELTS', 'Progress', 'EnglishLearning']}
    />
  );
}

export function ShareCertificate({ 
  name,
  estimatedBand 
}: { 
  name: string;
  estimatedBand: string;
}) {
  const shareText = `${name} earned an IELTS Tree Certificate with an estimated band score of ${estimatedBand}!`;
  
  return (
    <SocialShare 
      title="IELTS Tree Certificate"
      text={shareText}
      hashtags={['IELTS', 'Certificate', 'Achievement']}
    />
  );
}

'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AuthSocialButton() {
  return (
    <div className="flex flex-col gap-y-3">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full space-x-3"
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        <span>Continue with Google</span>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full space-x-3"
      >
        <Image src="/github.svg" alt="Google" width={20} height={20} />
        <span>Continue with Github</span>
      </Button>
    </div>
  );
}

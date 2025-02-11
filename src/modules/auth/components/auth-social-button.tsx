'use client';

import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function AuthSocialButton() {
  const [isPending, setIsPending] = useState<true | false>(false);
  const { signIn } = useAuthActions();

  function authSocialButton(state: 'google' | 'github') {
    setIsPending(true);
    signIn(state).finally(() => setIsPending(false));
  }

  return (
    <div className="flex flex-col gap-y-3">
      <Button
        disabled={isPending}
        onClick={() => authSocialButton('google')}
        type="button"
        variant="outline"
        size="lg"
        className="w-full space-x-3"
      >
        <Image src="/google.svg" alt="Google" width={20} height={20} />
        <span>Continue with Google</span>
      </Button>
      <Button
        disabled={isPending}
        onClick={() => authSocialButton('github')}
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

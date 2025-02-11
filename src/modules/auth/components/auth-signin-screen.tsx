'use client';

import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { SignInSchema, signInSchema } from '../validation/sign-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import AuthSocialButton from './auth-social-button';

export default function AuthSignInScreen() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { signIn } = useAuthActions();
  const [isPending, setIsPending] = useState<true | false>(false);

  function onSubmit(values: SignInSchema) {
    const { email, password } = values;

    setIsPending(true);
    signIn('password', { email, password, flow: 'signIn' }).finally(() =>
      setIsPending(false)
    );
  }

  return (
    <Card className="w-full h-full px-5 py-8">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="jhon@example.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full"
            >
              {isPending && (
                <Loader2Icon className="size-5 animate-spin text-primary-foreground" />
              )}
              <span>Login</span>
            </Button>
          </form>
        </Form>
        <p className="text-sm mt-3">
          <span className="text-muted-foreground">
            Don&apos;t have an account?
          </span>{' '}
          <Link href="/sign-up" className="text-sky-700 hover:underline">
            Sign up
          </Link>
        </p>
        <div className="my-5 px-10">
          <Separator />
        </div>
        <AuthSocialButton />
      </CardContent>
    </Card>
  );
}

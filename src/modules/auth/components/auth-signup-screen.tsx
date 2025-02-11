'use client';

import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { signUpSchema, SignUpSchema } from '../validation/sign-up-schema';
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
import { Loader2Icon, TriangleAlert } from 'lucide-react';
import Link from 'next/link';

export default function AuthSignUpScreen() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { signIn } = useAuthActions();
  const [isPending, setIsPending] = useState<true | false>(false);
  const [isError, setIsError] = useState<string>('');

  function onSubmit(values: SignUpSchema) {
    const { name, email, password } = values;
    setIsError('');
    setIsPending(true);
    signIn('password', { name, email, password, flow: 'signUp' })
      .catch(() => setIsError('Something went wrong'))
      .finally(() => {
        form.reset();
        setIsPending(false);
      });
  }

  return (
    <Card className="w-full h-full px-5 py-8">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Use your email or another services to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="jhon example"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            {!!isError && (
              <div className="flex items-center gap-x-3 p-3 bg-destructive/15 rounded-md text-destructive text-sm">
                <TriangleAlert />
                <span>{isError}</span>
              </div>
            )}
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full"
            >
              {isPending && (
                <Loader2Icon className="size-5 animate-spin text-primary-foreground" />
              )}
              <span>Sign up</span>
            </Button>
          </form>
        </Form>
        <p className="text-sm mt-3">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{' '}
          <Link href="/sign-in" className="text-sky-700 hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

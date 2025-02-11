import AuthUserButton from '@/modules/auth/components/auth-user-button';
import Switcher from './switcher';

export default function Sidebar() {
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center justify-between pt-2 pb-4">
      <Switcher />
      <div className="flex flex-col items-center justify-center mx-auto gap-y-1">
        <AuthUserButton />
      </div>
    </aside>
  );
}

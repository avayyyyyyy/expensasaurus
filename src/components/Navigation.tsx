import * as Popover from '@radix-ui/react-popover';
import { useAuthStore } from "expensasaures/shared/stores/useAuthStore";
import { clsx } from "expensasaures/shared/utils/common";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { shallow } from "zustand/shallow";
import { Logo } from "./icons/svg";

const Navigation = () => {
  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, []);

  const { userInfo, getUserInfo, user, logout } = useAuthStore((state) => ({
    user: state.user,
    userInfo: state.userInfo,
    getUserInfo: state.getUserInfo,
    logout: state.logout
  }), shallow);

  const router = useRouter();


  useEffect(() => {
    if (user) {
      getUserInfo()
    }
  }, [user])

  const anchorClasses = clsx(
    'text-md text-grey transition-colors h-navigation-height w-full flex items-center'
  )

  return <header className="fixed top-0 left-0 z-10 w-full border-transparent-white backdrop-blur-[12px]">
    <div className="max-w-[1200px] mx-auto sm:px-0 px-8 flex h-navigation-height items-center">
      <Link href={"/dashboard"} className="flex items-center text-md">
        <Logo className="w-[1.8rem] h-[1.8rem] mr-4" />
        <p className="text-[14px]">Expensasaures</p>
      </Link>
      <div
        className={clsx(
          "transition-[visibility] md:visible ml-auto",
          hamburgerMenuIsOpen ? "visible" : "invisible delay-500"
        )}
      >
        <nav
          className={clsx(
            "md:opacity-100 h-[calc(100vh_-_var(--navigation-height))] md:block w-full fixed md:relative top-navigation-height md:top-0 left-0 overflow-auto bg-white md:h-auto md:w-auto md:bg-transparent transform transition-[opacity] duration-500 md:translate-x-0",
            hamburgerMenuIsOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <ul
            className={clsx(
              "ease-in flex flex-col md:flex-row md:items-center h-full md:text-sm",
              "[&_a]:text-md dark:[&_a:hover]:text-gray-200 dark:text-slate-200 md:[&_a]:transition-colors [&_li]:ml-6 [&_li]:border-bottom [&_li]:border-b [&_li]:border-grey-dark md:[&_li]:border-none",
              "[&_a]:h-navigation-height [&_a]:w-full [&_a]:flex [&_a]:items-center",
              hamburgerMenuIsOpen ? "[&_a]:!translate-y-0" : "", // not working
              "[&_a]:duration-300 [&_a]:translate-y-8 md:[&_a]:translate-y-0 [&_a]:transition-[color,transform]"
            )}
          >
            <li>
              <Link className='text-gray' href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/expenses">Expense</Link>
            </li>
            <li className="">
              <Link href="/incomes">Incomes</Link>
            </li>
            <li className="">
              <Link href="/category">Category</Link>
            </li>
            <li className="">
              <Link href="/calender">Calender</Link>
            </li>
            <li>
              <Link href="/budgets">Budget</Link>
            </li>

          </ul>
        </nav>
      </div>

      {userInfo && <>
        <Popover.Root>
          <Popover.Trigger asChild>

            <div className="ml-4 cursor-pointer w-8 h-8 border-gray-200 border rounded-full text-xs flex items-center justify-center bg-blue-500 text-white">
              {userInfo?.name[0]}
            </div>

          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="z-[9999] rounded p-5 w-[200px] bg-white dark:bg-slate-500 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <div className="flex flex-col gap-2.5">
                <Link href={'/profile'} className='text-base'>Profile</Link>
                <button type='button' onClick={() => logout(router)} className='text-base'>Logout</button>
              </div>
              {/* <Popover.Close
                className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                aria-label="Close"
              > */}

              {/* </Popover.Close> */}
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>


      </>
      }
      {/* <div className="flex h-full items-center ml-4">
        <Link href='/login' className="mr-6 text-sm">
          Log in
        </Link>
        <Button variant={"primary"}>
          Sign up
        </Button>
      </div> */}


      <button
        className="ml-6 md:hidden"
        onClick={() => setHamburgerMenuIsOpen((open) => !open)}
      >
        <span className="sr-only">Toggle menu</span>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <path d="M0 0H18V1H0V0Z" fill="currentColor"></path>
          <path d="M0 10H18V11H0V10Z" fill="currentColor"></path>
        </svg>
      </button>
    </div>
  </header>
}


const OldNavigation = () => {
  return (
    <div className=" ">
      <div className="max-w-[1200px] mx-auto py-2 flex items-center justify-between ">
        <div>
          <Logo width={40} height={40} />
        </div>
        <div className="flex gap-4">
          <Link href={"/dashboard"}>
            <p className="px-4 py-2 rounded-full">Dashboard</p>
          </Link>
          <Link href={"/expenses"}>
            <p className="px-4 py-2 rounded-full">Expense</p>
          </Link>
          <Link href={"/incomes"}>
            <p className="px-4 py-2 rounded-full">Incomes</p>
          </Link>
          <Link href={"/category"}>
            <p className="px-4 py-2 rounded-full">Category</p>
          </Link>
          <Link href={"/calender"}>
            <p className="px-4 py-2 rounded-full">Calender</p>
          </Link>
          <Link href={"/budgets"}>
            <p className="px-4 py-2 rounded-full">Budget</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// const XNavigation = () => {
//   const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

//   useEffect(() => {
//     const html = document.querySelector("html");
//     if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
//   }, [hamburgerMenuIsOpen]);

//   useEffect(() => {
//     const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);

//     window.addEventListener("orientationchange", closeHamburgerNavigation);
//     window.addEventListener("resize", closeHamburgerNavigation);

//     return () => {
//       window.removeEventListener("orientationchange", closeHamburgerNavigation);
//       window.removeEventListener("resize", closeHamburgerNavigation);
//     };
//   }, []);

//   return <header className="fixed top-0 left-0 z-10 w-full border-transparent-white backdrop-blur-[12px]">
//     <div className="max-w-[120rem] mx-auto px-8 flex h-navigation-height">
//       <Link href={"/"} className="flex items-center text-md">
//         <Logo className="w-[1.8rem] h-[1.8rem] mr-4" /> Linear
//       </Link>
//       <div
//         className={clsx(
//           "transition-[visibility] md:visible",
//           hamburgerMenuIsOpen ? "visible" : "invisible delay-500"
//         )}
//       >
//         <nav
//           className={clsx(
//             "md:opacity-100 h-[calc(100vh_-_var(--navigation-height))] md:block w-full fixed md:relative top-navigation-height md:top-0 left-0 overflow-auto bg-slate-800 md:h-auto md:w-auto md:bg-transparent transform transition-[opacity] duration-500 md:translate-x-0",
//             hamburgerMenuIsOpen ? "opacity-100" : "opacity-0"
//             // Mobile nav is visible for a brief moment before it's hidden when switching from desktop to mobile
//             // hamburgerMenuIsOpen
//             //   ? "opacity-100 translate-x-0"
//             //   : "opacity-0 translate-x-[100vw]"
//           )}
//         >
//           <ul
//             className={clsx(
//               "ease-in flex flex-col md:flex-row md:items-center h-full md:text-sm",
//               "[&_a]:text-md [&_a:hover]:text-grey md:[&_a]:transition-colors [&_li]:ml-6 [&_li]:border-bottom [&_li]:border-b [&_li]:border-grey-dark md:[&_li]:border-none",
//               "[&_a]:h-navigation-height [&_a]:w-full [&_a]:flex [&_a]:items-center",
//               hamburgerMenuIsOpen ? "[&_a]:!translate-y-0" : "", // not working
//               "[&_a]:duration-300 [&_a]:translate-y-8 md:[&_a]:translate-y-0 [&_a]:transition-[color,transform]"
//             )}
//           >
//             <li>
//               <Link href="#">Features</Link>
//             </li>
//             <li>
//               <Link href="#">Method</Link>
//             </li>
//             <li className="md:hidden lg:block">
//               <Link href="#">Customers</Link>
//             </li>
//             <li className="md:hidden lg:block">
//               <Link href="#">Changelog</Link>
//             </li>
//             <li className="md:hidden lg:block">
//               <Link href="#">Integrations</Link>
//             </li>
//             <li>
//               <Link href="#">Pricing</Link>
//             </li>
//             <li>
//               <Link href="#">Company</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className="ml-auto flex h-full items-center">
//         <Link href='/login' className="mr-6 text-sm">
//           Log in
//         </Link>
//         <Button variant={"primary"}>
//           Sign up
//         </Button>
//       </div>
//       <button
//         className="ml-6 md:hidden"
//         onClick={() => setHamburgerMenuIsOpen((open) => !open)}
//       >
//         <span className="sr-only">Toggle menu</span>
//         <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
//           <path d="M0 0H18V1H0V0Z" fill="white"></path>
//           <path d="M0 10H18V11H0V10Z" fill="white"></path>
//         </svg>
//       </button>
//     </div>
//   </header>
// }

export default Navigation;

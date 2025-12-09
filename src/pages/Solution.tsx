import Navbar from "@/components/Navbar";

const Solution = () => {
  return (
    <div className="relative min-h-screen scroll-smooth bg-slate-50 text-slate-900 flex flex-col overflow-x-hidden w-full max-w-full">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-slate-900 font-['Montserrat'] whitespace-nowrap">
            We're working on it
          </h1>
          <p className="text-lg text-slate-600 font-['Montserrat'] mt-4">
            This page is under construction. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Solution;

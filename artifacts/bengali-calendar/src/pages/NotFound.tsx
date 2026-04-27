import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import { CURRENT_BS_YEAR } from "@/lib/bengali-calendar";

export default function NotFound() {
  return (
    <Layout>
      <Seo
        title="Page not found — Bengali Calendar"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="text-center py-16">
        <p className="text-sm uppercase tracking-widest text-[#7a1f12]/70">
          404
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#7a1f12] mt-2">
          Page not found
        </h1>
        <p className="text-stone-700 mt-3">
          The Bengali calendar page you were looking for doesn&apos;t exist.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            to="/"
            className="bg-[#7a1f12] text-amber-50 px-4 py-2 rounded-md hover:bg-[#5e1409]"
          >
            Go to Home
          </Link>
          <Link
            to={`/year/${CURRENT_BS_YEAR}`}
            className="bg-amber-100 text-[#7a1f12] px-4 py-2 rounded-md hover:bg-amber-200"
          >
            View Bengali Calendar {CURRENT_BS_YEAR}
          </Link>
        </div>
      </section>
    </Layout>
  );
}

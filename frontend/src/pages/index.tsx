import Link from "next/link";
import Image from "next/image";
import Button from "../components/UI/Button";
import Head from "next/head";

const LEARN_MORE = "learn-more";
const IMAGINE = "imagine";
const ABOUT_US = "about-us";

const headerLinks = [
  { title: "Imagine", path: IMAGINE },
  { title: "Our Platform", path: LEARN_MORE },
  { title: "About Us", path: ABOUT_US },
];

const Landing = () => {
  return (
    <>
      <Head>
        <title>Collectible</title>
      </Head>

      <header className="absolute z-10 flex w-full items-center py-[14px]">
        <Link className="ml-3 mr-[14px] w-[250px] shrink-0 px-4" href="/">
          <Image
            src={"/isologo.svg"}
            width={145.54}
            height={47.05}
            alt="Collectible Logo"
          />
        </Link>
        <div className="flex gap-14">
          {headerLinks.map((link) => (
            <Link
              className="text-gray-medium hover:text-gray-strong"
              key={link.title}
              href={`#${link.path}`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Link className="ml-auto mr-10 mt-2" href="/app">
          <Button className="px-[40px]" action={() => console.log("ahem")}>
            Enter App
          </Button>
        </Link>
      </header>

      <div className="h-screen overflow-auto">
        <div
          style={{
            backgroundImage: `url('/img/landing-system.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0 top 0",
          }}
        >
          <div className="mx-auto mb-12 h-screen w-2/3 items-center pt-14 text-center">
            <div className="mt-72 flex flex-col items-center justify-center">
              <h1 className="w-2/3 text-3xl font-bold text-gray-strong ">
                Explore, Collect and Dive into the World of Your Treasures.
              </h1>
              <div className="mt-8 flex w-40">
                <Link href={`#${IMAGINE}`} scroll={true}>
                  <Button className="" action={() => console.log("ahem")}>
                    Discover More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section
          id={IMAGINE}
          className="mx-auto mb-20 flex h-screen w-9/12 items-center gap-20 2xl:w-2/3 "
        >
          <Image
            className="w-1/2"
            src={"/img/discover-orbit.svg"}
            width={1972}
            height={1988}
            alt="Collectible Logo"
          />
          <article className="w-1/2">
            <h2 className="mb-4 text-xl font-extrabold text-gray-strong">
              Imagine
            </h2>
            <p className="mb-3 text-gray-strong">
              You{"'"}ve just bought a book - your ticket to a world of
              imagination. Hidden inside is a secret, a QR code waiting to be
              revealed. As you scratch to unveil it, you{"'"}re not just
              revealing a code, but unlocking a door to an entire universe
              related to your book. You{"'"}re about to step into a whole new
              world, leaving the mundane behind.
            </p>
            <p className="mb-3  text-gray-strong">
              Welcome to the Collectible universe!, scan the code, hop onto our
              website or app, and create your wallet account using just your
              email. Claim, and Boom! You are now a verified original book
              holder, a proud owner of a digital collectible tied to your
              physical book. You
              {"'"}ve not just bought a book; you{"'"}ve claimed a unique piece
              of its existence. And with it, come remarkable experiences.
            </p>
          </article>
        </section>

        <section
          id={LEARN_MORE}
          className="mx-auto mb-20 flex h-screen w-9/12 items-center gap-1 2xl:w-2/3"
        >
          <article className="w-1/2 text-right">
            <h2 className="mb-4 text-xl font-extrabold text-gray-strong">
              Our Platform
            </h2>
            <p className="mb-3 text-gray-strong">
              Collectible is an innovative nexus between entertainment offerings
              and enriching digital experiences. Our user-centric platform
              leverages the power of blockchain technology to ensure
              authenticity and trust.
            </p>
            <p className="mb-3 text-gray-strong">
              We{"'"}re all about fostering meaningful relationships.
              Collectible enables creators to tailor their communities, engage
              on a personal level, and reward their consumers with exciting
              benefits and extras for their purchases.
            </p>

            <p className="mb-3 text-gray-strong">
              a consumer, when you claim a collectible bundled with your
              purchase via QR scanning, it becomes blockchain-certified. This
              bond to your product unlocks your verified membership within the
              creator{"'"}s community, opening up a world of exclusive perks.
            </p>
          </article>{" "}
          <Image
            className="w-1/2"
            src={"/img/other-orbit.svg"}
            width={1972}
            height={1988}
            alt="Collectible Logo"
          />
        </section>

        <section
          id={ABOUT_US}
          className="mx-auto mb-20 flex h-screen w-9/12 items-center gap-10 2xl:w-2/3"
        >
          <Image
            className="w-1/2"
            src={"/img/collectible-orbit.svg"}
            width={2368}
            height={2093}
            alt="Collectible Logo"
          />
          <article className="w-1/2 ">
            <h2 className="mb-4 text-xl font-extrabold text-gray-strong">
              About Us
            </h2>
            <p className="mb-3 text-gray-strong">
              At Collectible, we{"'"}re rewriting the rules of engagement
              between creators and consumers. Our cutting-edge platform
              intertwines physical products and experiences with digital
              collectibles, deepening consumer interaction, boosting original
              product sales, and cultivating unique communities.
              <br /> <br />
              Powered by advanced blockchain technology, Collectible guarantees
              a secure, decentralized, and user-friendly experience. With a
              robust commitment to privacy, all user data on Collectible is
              encrypted and distributed, ensuring that our users have complete
              ownership of their data and their Non-fungible Tokens
              (Collectibles).
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default Landing;

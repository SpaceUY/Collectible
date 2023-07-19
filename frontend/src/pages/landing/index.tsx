import Link from "next/link";
import Image from "next/image";
import Button from "../../components/UI/Button";

const LEARN_MORE = "learn-more";
const DISCOVER = "discover";
const ABOUT_US = "about-us";

const headerLinks = [
  { title: "Discover", path: DISCOVER },
  { title: "Our Platform", path: LEARN_MORE },
  { title: "About Us", path: ABOUT_US },
];

const Landing = () => {
  return (
    <>
      <header className="absolute left-0 right-[calc(250px+14px)] z-10 flex items-center pt-[14px] pb-[14px] 2xl:left-[7vw] 2xl:right-[calc(250px+14px+7vw)]">
        <Link className="mr-[14px] w-[250px] shrink-0 px-4" href="/">
          <Image
            src={"/collectible-logo.svg"}
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
      </header>

      <div className="custom-scrollbar h-screen snap-y snap-mandatory overflow-auto">
        <div
          style={{
            backgroundImage: `url('/img/landing-system.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0 top 0",
          }}
        >
          <div className="mx-auto mb-12 h-screen w-2/3 snap-center items-center pt-14 text-center">
            <div className="mt-72 flex flex-col items-center justify-center">
              <h1 className="w-2/3 text-3xl font-bold text-gray-strong">
                Explore, Collect and Dive into the World of Your Treasures.
              </h1>
              <div className="mt-8 flex w-40">
                <Link href={`#${DISCOVER}`} scroll={true}>
                  <Button action={() => console.log("ahem")}>
                    Discover More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <section
          id={DISCOVER}
          className="mx-auto mb-20 flex h-screen w-2/3 snap-center items-center gap-10"
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
              Discover!
            </h2>
            <p className="mb-3 text-sm text-gray-strong">
              You{"'"}ve just bought a book - your ticket to a world of
              imagination. Hidden inside is a secret, a QR code waiting to be
              revealed. As you scratch to unveil it, you{"'"}re not just
              revealing a code, but unlocking a door to an entire universe
              related to your book. You{"'"}re about to step into a whole new
              world, leaving the mundane behind.
            </p>
            <p className="mb-3 text-sm text-gray-strong">
              Welcome to the Collectible universe! Scan the code, hop onto our
              website or app, and create your account using just your email.
              Boom! You are now a verified original book holder, a proud owner
              of a digital collectible tied to your physical book. You{"'"}ve
              not just bought a book; you{"'"}ve claimed a unique piece of its
              existence. And with it, come remarkable experiences.
            </p>
          </article>
        </section>

        <section
          id={LEARN_MORE}
          className="mx-auto mb-20 flex h-screen w-2/3 snap-center items-center gap-1"
        >
          <article className="w-1/2 text-right">
            <h2 className="mb-4 text-xl font-extrabold text-gray-strong">
              Our Platform
            </h2>
            <p className="mb-3 text-sm text-gray-strong">
              Collectible is a platform that serves as a bridge between
              entertainment products and unlockable experiences via digital
              collectibles, providing a seamless and user-friendly experience by
              leveraging blockchain technology.
            </p>
            <p className="mb-3 text-sm text-gray-strong">
              Collectible establishes a secure connection between creators and
              consumers, aiding creators in segmenting their consumer
              communities, connecting with them, and rewarding them with extras
              for the products they have already purchased.
            </p>

            <p className="mb-3 text-sm text-gray-strong">
              When a consumer purchases a product or ticket that contains a
              collectible and claims it, it becomes blockchain-certified, tied
              to both them and their original product. As verified holders, they
              become part of the creator{"'"}s community and begin to receive
              associated perks.
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
          className="mx-auto mb-20 flex h-screen w-2/3 snap-center items-center gap-10"
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
            <p className="mb-3 text-sm text-gray-strong">
              Collectible is an innovative platform designed to create an
              unbreakable bond between creators of entertainment products and
              their consumers. By bridging physical products and experiences
              with digital collectibles, it enhances consumer engagement,
              increases sales, and fosters exclusive communities. Collectible
              leverages blockchain technology to provide a seamless and friendly
              user experience, where creators can segment their consumer
              communities and offer them unique perks tied to their purchases.
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default Landing;

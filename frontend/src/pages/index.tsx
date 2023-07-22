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
            <div
              className="text-gray-medium hover:text-gray-strong"
              key={link.title}
              // href={`#${link.path}`}
            >
              {link.title}
            </div>
          ))}
        </div>
        <Link className="ml-auto mr-10 mt-2" href="/app">
          <Button className="px-[40px]" action={() => console.log("ahem")}>
            Enter App
          </Button>
        </Link>
      </header>

      <div className="h-screen snap-y snap-mandatory overflow-auto">
        <div
          style={{
            backgroundImage: `url('/img/landing-system.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0 top 0",
          }}
        >
          <div className="mx-auto mb-12 h-screen w-2/3 snap-center items-center pt-14 text-center">
            <div className="mt-72 flex flex-col items-center justify-center">
              <h1 className="w-2/3 text-3xl font-bold text-gray-strong ">
                Explore, Collect and Dive into the World of Your Treasures.
              </h1>
              <div className="mt-8 flex w-40">
                {/* <Link href={`#${IMAGINE}`} scroll={true}> */}
                <Button className="" action={() => console.log("ahem")}>
                  Discover More
                </Button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>

        <section
          id={IMAGINE}
          className="mx-auto mb-20 flex h-screen w-9/12 snap-center  items-center  gap-20 2xl:w-2/3 "
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
          className="mx-auto mb-20 flex h-screen w-9/12 snap-center items-center gap-1 2xl:w-2/3"
        >
          <article className="w-1/2 text-right">
            <h2 className="mb-4 text-xl font-extrabold text-gray-strong">
              Our Platform
            </h2>
            <p className="mb-3 text-gray-strong">
              Collectible is a platform that serves as a bridge between
              entertainment products and unlockable experiences via digital
              collectibles, providing a user-friendly experience and leveraging
              blockchain technology to ensure validity.
            </p>
            <p className="mb-3 text-gray-strong">
              Collectible establishes a secure connection between creators and
              consumers, aiding creators in segmenting their consumer
              communities, connecting with them, and rewarding them with extra
              benefits and perks for the products they have already purchased.
            </p>

            <p className="mb-3 text-gray-strong">
              When a consumer purchases a product or ticket that contains a
              collectible and claims it by scanning the QR, it becomes
              blockchain-certified and tied to both the consumer and their
              original product. As verified holders, they become part of the
              creator{"'"}s community and begin to receive associated perks.
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
          className="mx-auto mb-20 flex h-screen w-9/12 snap-center items-center gap-10 2xl:w-2/3"
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
            <p className="mb-3  text-gray-strong">
              Collectible is an innovative platform designed to create an
              unbreakable bond between entertainment creators and their
              consumers. By bridging physical products and experiences with
              digital collectibles, it enhances consumer engagement, increases
              sales of original products, and fosters exclusive communities.
              <br /> <br />
              Collectible leverages the latest blockchain technology to provide
              a secure and descentralized but friendly user experience. All the
              private data on Collectible is encrypted and stored in a
              distribuited manner, and our users are the only owners of their
              data and their Collectibles (Non-fungible Tokens).
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default Landing;

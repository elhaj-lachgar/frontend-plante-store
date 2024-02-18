import { Button } from "@chakra-ui/react";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="absolute top-0 w-full bg-gray-50">
      <Banner text="About Us"/>
      <div className="my-20 flex flex-col gap-y-4 w-11/12 lg:flex-row lg:gap-x-10 mx-auto">
        <h1 className="w-full text-xl font-semibold">
          We Work Hard To Provide You The Best Quality Plants And Succulents
        </h1>
        <div className="flex-col flex gap-y-4 lg:gap-y-6 ">
          <p className="text-gray-500">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal. It is a
            long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using.
          </p>
          <Button className="w-[100px]">Read More</Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-10 my-20 w-11/12 mx-auto">
        <h1 className="font-bold text-xl lg:text-2xl">Our Company</h1>
        <p className="w-11/12 md:w-9/12 lg:w-[600px] text-center text-gray-500">
          I am text block. Click edit button to change this text. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus
          nec ullamcorper mattis, pulvinar dapibus leo, when an unknown printer
          took a galley.
        </p>
        <img
          src="/about/bg4-free-img.jpg"
          alt="image"
          className="rounded-2xl"
        />
        <div className="flex flex-col lg:flex-row lg:justify-between items-center gap-y-5 text-gray-500 w-full">
          <p className="lg:w-[500px]">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using ‘Content here, content
            here’, making it look like readable English. Many desktop publishing
            packages and web page editors
          </p>
          <p className="lg:w-[500px]">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn’t anything embarrassing hidden in the
            middle of text.
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default About;

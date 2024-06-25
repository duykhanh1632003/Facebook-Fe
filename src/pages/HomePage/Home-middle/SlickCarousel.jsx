import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdOutlineAdd } from "react-icons/md";
export default function SlickCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div className="bg-[#F0F2F5]">
      <Carousel responsive={responsive}>
        <div className="card relative w-[250px] z-10 bg-white cursor-pointer ">
          <div className="w-[40px] h-[40px] bg-white absolute rounded-full mt-[144px] ml-[54px]">
            <div className="bg-blue-500 absolute z-20 h-[37px] w-[37px] mt-10 rounded-full flex items-center justify-center text-4xl">
              <MdOutlineAdd className="text-3xl" />
            </div>
          </div>
          <p className="absolute z-10 mt-[230px] ml-[50px] text-black text-sm font-medium ">
            Tạo tin
          </p>
          <div className="h-[202px] rounded-lg relative">
            <img
              className=" img-card object-fill rounded-lg h-[202px]"
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
        <div className="card relative w-[250px] z-10 cursor-pointer">
          <div className="absolute w-[39px] rounded-full p-1 bg-blue-600 z-10 mt-[11px] ml-[11px]">
            <img
              className="rounded-full"
              src="/src/assets/328619176_717087896492083_6413426032507387658_n.jpg"
            />
          </div>
          <p className="absolute z-10 mt-[224px] ml-[13px] text-slate-50 text-sm font-medium ">
            Sport Header
          </p>
          <div className="h-[250px] rounded-lg absolute">
            <img
              className=" img-card object-fill rounded-lg h-[250px] "
              src="/src/assets/406860438_1048481983054231_6833658113738926574_n.jpg"
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
}

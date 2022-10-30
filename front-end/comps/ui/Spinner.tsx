const Spinner = () => (
  <div className="relative mx-auto h-[125px] w-[25px] translate-y-[-50px]">
    <div className="absolute bottom-0 h-[10px] w-full scale-x-[0.8] animate-shadowScale rounded-[100%] bg-gray-600 opacity-60"></div>
    <div className="h-[25px] w-[25px] animate-bounce">
      <div
        className="h-[25px] w-[25px] animate-roll"
        style={{
          backgroundImage:
            "url('https://cdn2.iconfinder.com/data/icons/activity-5/50/26BD-soccer-ball-128.png')",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  </div>
);
export default Spinner;

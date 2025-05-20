function Star({ rating }) {
  return (
    <>
      {Array(5)
        .fill("")
        .map((_, index) => (
          <img
            src={
              rating > index ? "/starIconFilled.svg" : "/starIconOutlined.svg"
            }
            alt="star-icon"
            className="w-4.5 h-4.5"
          />
        ))}
    </>
  );
}

export default Star;

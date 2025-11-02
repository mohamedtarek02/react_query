const ProductItem = (props) => {
  function nextClientHandler() {
    console.log("Next");
  }
  function toggleClientHandler() {
    console.log("Next");
  }

  return (
    <div className="flex gap-6 justify-center">
      <button onClick={nextClientHandler}>Fetch Next User</button>
      <button onClick={toggleClientHandler}>Toggle User Info </button>
    </div>
  );
};

export default ProductItem;

const mainClass =
  "mt-20 mb-20 mx-auto shadow-md  rounded-lg p-4 text-center bg-[#340a75]";

const Counter = ({ userData }) => {
  if (!userData) {
    return (
      <main className={mainClass}>
        <h1>No User Fetched yet...</h1>
      </main>
    );
  }

  return (
    <main class={mainClass}>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name} </p>
    </main>
  );
};

export default Counter;

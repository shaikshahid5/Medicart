import Auth from "../Auth";

const Login = () => {
  const handleLoginSubmit = (e, payload) => {
    e.preventDefault();
    console.log(JSON.stringify(payload));
  };

  return (
    <>
      <div className="container my-auto">
        <Auth type="Login" onSubmit={handleLoginSubmit} />
      </div>
    </>
  );
};

export default Login;
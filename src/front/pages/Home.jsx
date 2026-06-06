import React from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

export const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4">JWT Authentication Project</h1>

      <p className="lead">
        <img
          src={rigoImageUrl}
          className="img-fluid rounded-circle mb-3"
          alt="Rigo Baby"
        />
      </p>

      <div className="alert alert-info">
        <p>
          Bienvenido al proyecto de autenticación con Flask + React + JWT.
        </p>

        <p>
          Usa <b>Signup</b> para registrarte, luego <b>Login</b> para iniciar sesión y acceder a la página privada.
        </p>
      </div>
    </div>
  );
};
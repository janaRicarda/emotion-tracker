import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Signin() {
  const [providers, setProviders] = useState();
  useEffect(() => {
    async function prov() {
      const providers = await getProviders();
      setProviders(providers);
    }
    !providers && prov();
  });

  console.log(providers);

  return (
    <>
      <h1>Signin</h1>
      {providers &&
        Object.values(providers).map((provider) => {  
          return (
            <div key={providers.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
    </>
  );
}

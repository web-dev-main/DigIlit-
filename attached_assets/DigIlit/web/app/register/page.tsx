export default function RegisterPage() {
  return (
    <main className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form className="space-y-4">
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Password" type="password" />
          <button className="btn btn-primary w-full" type="submit">Create Account</button>
        </form>
      </div>
    </main>
  );
}

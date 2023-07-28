import { createEffect, createSignal } from 'solid-js';
import './App.css';
import InputForm from './components/InputForm';
import Display from './components/Display';

function App() {
  const [birthdate, setBirthdate] = createSignal({});

  createEffect(() => {
    console.log(birthdate());
  });

  return (
    <main class="card">
      <section>
        <InputForm onValidProp={(item) => setBirthdate(item)} />
        <div class="hr-container">
          <hr class="hr-line" />
        </div>
        <Display birthdate={birthdate()} />
      </section>
    </main>
  );
}

export default App;

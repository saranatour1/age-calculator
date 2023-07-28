import { createEffect, createSignal, onMount } from "solid-js";
import Input from "./Input";

function InputForm(props) {
  //set days , months, year

  const [days ,setDays] =createSignal(0);
  const [months , setMonths] = createSignal(0);
  const [years , setYears] =createSignal(0);

  createEffect(()=>{
      props.onValidProp({days:days(),months:months(),years:years()});     
  });

  return (
  <div class="date-vals">
    <Input label='DAY' placeHolder='DD' setPropType={(day) => setDays(day)} />
    <Input label='MONTH' placeHolder='MM' setPropType={(month) => setMonths(month)} />
    <Input label='YEAR' placeHolder='YYYY' setPropType={(year) => setYears(year)}  />
  </div>
  )
}

export default InputForm;
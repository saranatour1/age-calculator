import { createEffect, createSignal } from "solid-js";

function Display(props) {
  const [birthdate, setBirthdate] = createSignal({});
  const [age, setAge] = createSignal({});

  createEffect(() => {
    setBirthdate(props.birthdate);
    console.log(birthdate().days, birthdate().months, birthdate().years);
    calculateAge(birthdate());
  });

  /**
   * The `calculateAge` function calculates the age in years, months, and days based on a given birthday.
   */
  const calculateAge = (birthday) => {
    const nowDate = new Date();

    let ageYears = nowDate.getFullYear() - birthday.years;

    if (
      nowDate.getMonth() < birthday.months ||
      (nowDate.getMonth() === birthday.months && nowDate.getDate() < birthday.days)
    ) {
      ageYears--;
    }

    let ageMonths = nowDate.getMonth() - birthday.months + 1;
    if (ageMonths < 0) {
      ageMonths += 12;
    }

    let ageDays = nowDate.getDate() - birthday.days;
    if (ageDays < 0) {
      const lastDayOfMonth = new Date(
        nowDate.getFullYear(),
        nowDate.getMonth() + 1,
        0
      ).getDate();
      ageDays += lastDayOfMonth;
    }

    setAge({ years: ageYears, months: ageMonths, days: ageDays });
    console.log(age);
  };

  return (
    <section class="display">
      <p>
        {!birthdate().years && <span class="fallback"> -- </span>}
        {birthdate().years && <span>{age().years} </span>}
        years
      </p>
      <p>
        {!birthdate().months && <span class="fallback"> -- </span>}
        {birthdate().months && <span>{age().months} </span>}
        months
      </p>
      <p>
        {!birthdate().days && <span class="fallback"> -- </span>}
        {birthdate().days && <span>{age().days} </span>}
        days
      </p>
    </section>
  );
}

export default Display;

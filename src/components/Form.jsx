import { useState } from "react";
import Sum from "./Sum";

function Form() {
  const [totalPrice, setTotalPrice] = useState(3300000);
  const [initialFee, setInitialFee] = useState(420000);
  const [initialPercent, setInitialPercent] = useState(10);
  const [term, setTerm] = useState(60);
  const [sum, setSum] = useState(4467313);
  const [payment, setPayment] = useState(114455);

  let maxTotal = 6000000;
  let minTotal = 1000000;
  let maxPercent = 60;
  let minPercent = 10;
  let maxFee = (totalPrice / 100) * maxPercent;
  let minFee = (totalPrice / 100) * minPercent;
  let maxTerm = 60;
  let minTerm = 1;

  let calcucate = () => {
    let monthlyPay;
    let leasing;
    let credit = totalPrice - initialFee;
    let numberOfMonth = term;
    let initial = Math.round((totalPrice / 100) * initialPercent);

    monthlyPay = Math.round(
      credit *
        ((0.035 * Math.pow(1 + 0.035, numberOfMonth)) /
          (Math.pow(1 + 0.035, numberOfMonth) - 1))
    );
    leasing = Math.round(initialFee + numberOfMonth * monthlyPay);

    if (monthlyPay < 0) {
      return false;
    } else {
      setPayment(monthlyPay);
      setSum(leasing);
      setInitialFee(initial);
    }
  };

  const getBgrSize = (x, max, min) => {
    return {
      backgroundSize: `${((x - min) * 100) / (max - min)}% 100%`,
    };
  };

  const [dis, setDis] = useState(false);

  const request = async function () {
    const resultForm = {
      car_coast: totalPrice,
      initail_payment: initialFee,
      initail_payment_percent: initialPercent,
      lease_term: +term,
      total_sum: sum,
      monthly_payment_from: payment,
    };

    setDis(true);
    setTimeout(() => setDis(false), 2000);

    const res = await fetch("https://hookb.in/eK160jgYJ6UlaRPldJ1P", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultForm),
    });

    const json = await res.json();
  };

  return (
    <form action="#" className="form">
      <div className="form__inputs">
        <Sum
          inputNum={totalPrice}
          changeNum={(e) => {
            setTotalPrice(e.target.value);
            calcucate();
          }}
          defNum={totalPrice}
          maxNum={maxTotal}
          minNum={minTotal}
          title="Стоимость автомобиля"
          what="₽"
          rangeVal={totalPrice}
          changeRange={(e) => {
            setTotalPrice(e.target.value);
            calcucate();
          }}
          colorLine={getBgrSize(totalPrice, maxTotal, minTotal)}
          disBtn={dis}
        ></Sum>
        <Sum
          inputNum={initialFee}
          changeNum={(e) => {
            setInitialFee(e);
            calcucate();
          }}
          defNum={initialFee}
          maxNum={maxFee}
          minNum={minFee}
          title="Первоначальный взнос"
          what={initialPercent}
          rangeVal={initialPercent}
          maxRange={maxPercent}
          minRange={minPercent}
          changeRange={(e) => {
            setInitialPercent(e.target.value);
            calcucate();
          }}
          colorLine={getBgrSize(initialPercent, maxPercent, minPercent)}
          disBtn={dis}
        ></Sum>
        <Sum
          inputNum={term}
          changeNum={(e) => {
            setTerm(e);
            calcucate();
          }}
          defNum={term}
          maxNum={maxTerm}
          minNum={minTerm}
          title="Срок лизинга"
          what="мес."
          rangeVal={term}
          changeRange={(e) => {
            setTerm(e.target.value);
            calcucate();
          }}
          colorLine={getBgrSize(term, maxTerm, minTerm)}
          disBtn={dis}
        ></Sum>
      </div>
      <div className="form__price">
        <div className="form__wrapper-price">
          <p>Сумма договора лизинга</p>
          <span>{sum.toLocaleString("ru-RU")} ₽</span>
        </div>
        <div className="form__wrapper-price pay">
          <p>Ежемесячный платеж от</p>
          <span>{payment.toLocaleString("ru-RU")} ₽</span>
        </div>
        <button disabled={dis} className="form__btn" onClick={request}>
          Оставить заявку
        </button>
      </div>
    </form>
  );
}

export default Form;

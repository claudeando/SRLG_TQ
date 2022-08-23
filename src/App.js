import React, { useEffect, useState } from 'react';
import './App.css';

import Header from './components/Header';
import Button from './components/Button';


const JWT_TOKEN = "eyJhbGciOiJQUzI1NiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAA_31Uy5KbMBD8lS3Oqy3ANhhuueUH8gEjzchWrZAoSexmK5V_j0DCGK8rx-6eR8-M4E-hvC_6AkbFkAb75gM4rcyFg3l_E3YoXgs_8RhR1qe2q5uG4aHt2BGrM-PQEaO660TTnqkqyxhMv8eir5qmqtuuKtvXQkFIRNXV7UyAEHYy4afVSO6Xwlj7JNuOc9EwLtozO1bHA4MSgUnJAY-iOUF3iLWDfSeTMtqmix0QmSixZUdOwOAU3dR4PlQtNkQlxIw41g8hyPuUJflZVNWpZNFNzY41Sca5rBm2LTUSW8Jq7uOFHWleSnLKhLaesHcE-LJy18U-MzDQUyF8jQ-CQjJBSUVuz2vlw47JANFF4z2hCjeQlBBAXAe6RW7406lALzCFq3XKxzMyZVB9KJxAp2AOGozI1gS4uEFrgrM6NZqZrFkjlRsgKGuYlUxOBv1N8rfuK0itxeSDHdYRaQCVC2uKRsylh3HUXze0RA1gEAL1SJpiiRVmzb1TmAcZHUlyFL37_0nJRtJGDYLiBgJd3DLHfeJ3MaeSE1dYpxsoQHQDvYhwUTNehhrhi2iVEshDJLAFMTXAJc-UidjZmfUsKf5ODg6MB7G5jjTjk37v1-vSRm0OEt5MJLwWmN9IfG-DCltNbUU0cVdhIZidH8kjm7OclUqvI6UZd9QS5UiQGsMO-L2UFr4cz4HOooePeFPPLnaztePycDvuW2baXyz8rMQmPqm1iamouBJOmpDl_WWaQojzTmOGI6zfVPyBLm-bWYd37ffs2nfPPsln9tPc-EDLAYX_eKRGlJmauBcuLnd-N2uXe26Jun9cy_0eX1vx9x9yNJJHGQYAAA.ZiYslf7V4VNySS9QUXXNpWR1vlzO4oOGM5iuqU0aAwrtgBdUzA0xc3wLjLmWi6LoEzF92KokcoaglA2O3c7HBNybTP4-03KqcWST4zWLc5ntp-7IvQwSguFrU3gxdeZHPJx635FruQfGRNxMwiPu5-GIT3v4cNRP-cI5nk9SJSNd6ur_km0DgODUfpMzjSvZCvxvakjcOr_5V2j9yY1Vw-9BfkqXKRgWZI0HizkX8jdPMvlnOE8l504V8BlIYO1JhMURWOi0E0MJqxbezk8YnvC9Q7G5lDabLF-qiGUt6U-Nl7A6S4RkSDAbYDQf8l5HEkoyb_0uruKxJrqNZS4gDnWneRipoAB9OhJZyXS4az36SlPiF4ANx_T9EX-0_vs8Es99CT-Em_I4ecVaCURBquWWdQZN1DYhYIpsTWCw_3z4Gn1t38Qka-JykvhDW_Hr_sn96TpxgrrI02qGO0gbMbTRMdF4AydWdIHs15tWBN-cgQPEIAyxkSe1GsYhR38IKpdBZH41Qoezw-BkDKvROuqNuLDTUOxXiUnuYgzK2pvFzOuiRj9Tc2S1rFRkFY5ig-JT1UWAyOFhQvi-gKG8y75rHuz3f1qKds5BzDQ3pYU07O_WgTK711o79MAthlaUU_TxCU3AxmbDHX1dtX_bn5hxOYnSTWPrWghu1zGJPbU";


function App() {

  const [account, setAccount] = useState(null);
  useEffect(() => {
    // GET accounts - looking only at the first account
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + JWT_TOKEN,
      'User-Agent': 'Test User',
    }
    fetch('https://api-sandbox.starlingbank.com/api/v2/accounts', { headers })
      .then(response => response.json())
      .then(data => setAccount(data.accounts[0]));
  }, []);

  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    // GET transactions per account
    if (account !== null) {
      const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JWT_TOKEN,
        'User-Agent': 'Test User',
      }

      //Calculate one week back - To-do
      fetch(`https://api-sandbox.starlingbank.com/api/v2/feed/account/${account.accountUid}/category/${account.defaultCategory}?changesSince=2022-08-01T12:34:56.000Z`, { headers })
        .then(response => response.json())
        .then(data => setTransactions(data.feedItems.filter(function (item) {
          return item.direction === "OUT"; //Check if this is working
        })
        ));
    }
  }, [account]);

  //To-do - transactions where direction: "OUT"
  function calculateRoundUp(transactionsList) {

    let roundUp = 0;
    transactionsList.forEach(element => {
      //Assuming currency is always GBP for now
      let amt = element.amount.minorUnits / 100; // double check what minor units means
      //Calculate difference from nearest pound and add to round up

    });
    return roundUp
  }

  useEffect(() => {
    if (transactions !== null) {
      calculateRoundUp();
    }
  }, [transactions]);

  return (
    <>
      <main>
        <Header />
        <div>
          <section id="transactionFeed">
            <h2>Transaction Feed</h2>
            <div className="sectionBody">
            </div>
          </section>

          <section id="savingsGoal">
            <h2>Savings Goal</h2>
            <div className="sectionBody">

            </div>

          </section>
        </div >

        <Button />
      </main >

    </>
  );
}

export default App;

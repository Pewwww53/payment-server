const express = require("express");

const app = express();
app.use(express.json());

app.post("/callback", (req, res) => {
  console.log("eGovPay callback:", req.body);

  // Verify the payment result here, then save its status to Firebase.
  // Do not redirect this webhook request.
  res.sendStatus(200);
});

app.get("/return", (req, res) => {
  const txnid = encodeURIComponent(req.query.txnid ?? "");
  const deepLink = `ebayanihan://program?txnid=${txnid}`;

  res.status(200).type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Payment complete</title>
      </head>
      <body>
        <h2>Payment processed</h2>
        <p>Returning to eBayanihan…</p>
        <p><a href="${deepLink}">Open eBayanihan</a></p>
        <script>
          window.location.href = "${deepLink}";
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("Payment server: http://localhost:3000");
});

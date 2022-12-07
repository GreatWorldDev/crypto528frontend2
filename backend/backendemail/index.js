const express = require('express');
const path = require('path');
require('dotenv').config();
const { middlewares } = require('./middlewares/middleware.index');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'ejs');

middlewares(app);

app.get('/', (req, res) => {
  res.render('email', {
    SubjectHeading: 'Welcome to the Crypto528 Republik',
    BodyInfoText: `Greetings Citizen, <br/> <br/> Welcome to the 528 Republik and thank you for joining our vision to create a utopian global blockchain society. As we continue to evolve and develop as a society, we encourage all members of our community to help shape our future.  </br> </br>
    By operating as a Decentralized Autonomous Organization (DAO) we ensure that everyone has a voice and that all ideas have the opportunity to come to life. 
    </br> </br> To stay up to date on our activities and limited edition 528 Turtles Club NFT launch please follow us on our socials <a href="https://discord.gg/V3jYNFpK" target="_blank"><i> Discord </i> </a>, <a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> <i>Twitter</i></a>, or <a href="https://t.me/crypto528DAO" target="_blank"><i>Telegram</i></a>.`,
    link: 'https://crypto528.com',
    PsText: 'Thanks!',
    quotesPage: true,
    regSuccesPage: false,
    Address: `One Love, </br> </br>
    The Crypto528 Team`
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('dirname', path.join(
    path.dirname(process.mainModule.filename),
    'public',
    'team.png'
  ));
  console.log(`Server is running on port ${PORT}`);
});

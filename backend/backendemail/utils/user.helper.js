/* eslint-disable no-nested-ternary */
const path = require('path');
const sendEmail = require('./sendMail');

const emailTemplateEnglish = {
  SubjectHeading: 'Welcome to the Crypto528 Republik',
  BodyInfoText: `Greetings Citizen! <br/> <br/> Welcome to the 528 Republik and thank you for joining our vision to create a utopian global blockchain society. As we continue to evolve and develop as a society, we encourage all members of our community to help shape our future.  </br> </br>
  By operating as a Decentralized Autonomous Organization (DAO) we ensure that everyone has a voice and that all ideas have the opportunity to come to life. 
  </br> </br> To stay up to date on our activities and limited edition 528 Turtles Club NFT launch please follow us on our socials <a href="https://discord.gg/V3jYNFpK" target="_blank"><i> Discord </i> </a>, <a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> <i>Twitter</i></a>, or <a href="https://t.me/crypto528DAO" target="_blank"><i>Telegram</i></a>.`,
  link: 'https://crypto528.com',
  PsText: 'Thanks!',
  quotesPage: true,
  regSuccesPage: false,
  Address: `One Love, </br> </br>
  The Crypto528 Team`
};

const emailTemplateChinese = {
  SubjectHeading: '歡迎來到Crypto528 DAO共和國',
  BodyInfoText: `市民們，你們好! <br/> <br/> 歡迎來到528共和國，感謝您加入我們，共創願景，創造一個烏托邦式的全球區塊鏈社會。 我們一直作為一個社會，不斷在演變和發展，我們鼓勵我們社區的所有成員幫助塑造我們的未來。  </br> </br>
  作為一個去中心化的自治組織（DAO），我們確保每個人都有發言權，所有想法都有機會實現。 
  </br> </br> 為了及時瞭解我們的活動和限量版528 Turtles Club NFT的發佈情況，請關注我們的社交媒體： <a href="https://discord.gg/V3jYNFpK" target="_blank"><i> Discord </i> </a>, <a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> <i>Twitter</i></a>, 或 <a href="https://t.me/crypto528DAO" target="_blank"><i>Telegram</i></a>.`,
  link: 'https://crypto528.com',
  PsText: 'Thanks!',
  quotesPage: true,
  regSuccesPage: false,
  Address: `誠摯的愛， </br> </br>
  Crypto528團隊`
};

const emailTemplatePortugese = {
  SubjectHeading: 'Seja Bem-vindo à República da Crypto528',
  BodyInfoText: `Saudações, Cidadão! <br/> <br/> Seja bem-vindo(a) à República 528. Muito obrigado por se juntar à nossa visão de criar uma sociedade utópica global no blockchain. À medida que continuamos a evoluir e a nos desenvolver como sociedade, encorajamos todos os membros da nossa comunidade a ajudar a moldar o nosso futuro.  </br> </br>
  Ao operar como uma Organização Autônoma Descentralizada (da sigla em inglês DAO), garantimos que todos tenham voz e que todas as ideias tenham a oportunidade de ganhar vida. 
  </br> </br> Para se manter atualizado sobre nossas atividades e o lançamento dos NFTs de edição limitada “528 Turtles Club”, siga a gente nas nossas redes sociais:  <a href="https://discord.gg/V3jYNFpK" target="_blank"><i> Discord </i> </a>, <a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> <i>Twitter</i></a>, ou <a href="https://t.me/crypto528DAO" target="_blank"><i>Telegram</i></a>.`,
  link: 'https://crypto528.com',
  PsText: 'Thanks!',
  quotesPage: true,
  regSuccesPage: false,
  Address: `Forte abraço, </br> </br>
  Equipe da Crypto528`
};

const emailTemplateSpanish = {
  SubjectHeading: 'Bienvenido a la Republik DAO Crypto 528',
  BodyInfoText: `¡Saludos Ciudadano! <br/> <br/> Bienvenido a la Republik 528 y gracias por unirse a nuestra visión de crear una sociedad blockchain global utópica. A medida que continuamos evolucionando y desarrollándonos como sociedad, alentamos a todos los miembros de nuestra comunidad a ayudar a dar forma a nuestro futuro. </br> </br>
  Al operar como una Organización Autónoma Descentralizada (DAO), nos aseguramos de que todos tengan voz y que todas las ideas tengan la oportunidad de cobrar vida.
  </br> </br> Para mantenerse actualizado sobre nuestras actividades y el lanzamiento de la edición limitada 528 Turtles Club NFT, síganos en nuestras redes sociales <a href="https://discord.gg/V3jYNFpK" target="_blank"><i> Discord </i> </a>, <a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> <i>Twitter</i></a>, o <a href="https://t.me/crypto528DAO" target="_blank"><i>Telegram</i></a>.`,
  link: 'https://crypto528.com',
  PsText: 'Thanks!',
  quotesPage: true,
  regSuccesPage: false,
  Address: `Con amor, </br> </br>
  El equipo de Crypto528`
};

const emailTemplateArabic = {
  SubjectHeading: 'أهلًا ومرحبًا بك في جمهورية منظمة Crypto528 اللامركزية المستقلة',
  BodyInfoText: `مواطننا الكريم، <br/> <br/> أهلًا ومرحبًا بك معنا في جمهورية 528 وشكرًا جزيلًا على شغفك ومشارتك رؤيتنا لإنشاء مجتمع عالمي طوباوي مبنى على تقنية البلوكشين. وبينما نواصل النمو والتطور كمجتمع واحد، نحث جميع أعضاء مجتمعنا على المساعدة في تشكيل مستقبلنا. </br> </br>
  العمل كمنظمة مستقلة لامركزية (DAO) يعني أن لكل شخص صوت وأن لجميع الأفكار فرصة في الظهور.
  </br> </br> حرص على ألا يفتك أي جديد بخصوص أنشطتنا والإصدار المحدود من 528 Turtles Club NFT بمتابعتنا على مواقع التواصل الاجتماعي <a href="https://discord.gg/V3jYNFpK" target="_blank">ديسكور</a>د أو<a href="https://mobile.twitter.com/crypto528dao?s=21" target="_blank"> تويتر</a> أو<a href="https://t.me/crypto528DAO" target="_blank"> تليغرام</a>. `,
  link: 'https://crypto528.com',
  PsText: 'Thanks!',
  quotesPage: true,
  regSuccesPage: false,
  Address: `حبّنا وتحيّاتنا، </br> </br>
  فريق Crypto528`
};

const sendGreetingEmail = async (email, subject, locale) => {
  try {
    // eslint-disable-next-line global-require
    const ejs = require('ejs');
    let html;
    let attachment;
    ejs.renderFile(
      `${__dirname}/../views/email.ejs`,
      locale === 'es'
        ? emailTemplateSpanish
        : locale === 'pt_BR'
          ? emailTemplatePortugese
          : locale === 'ar'
            ? emailTemplateArabic
            : locale === 'zh_CN'
              ? emailTemplateChinese
              : emailTemplateEnglish,
      (err, data) => {
        if (err) throw err;
        else {
          html = data;
          console.log('dirname', path.dirname(process.mainModule.filename));
          attachment = [
            {
              filename: 'logo.png',
              path: path.join(
                path.dirname(process.mainModule.filename),
                'public',
                'logo.png'
              ),
              cid: 'logo'
            },
            {
              filename: 'team.png',
              path: path.join(
                path.dirname(process.mainModule.filename),
                'public',
                'team.png'
              ),
              cid: 'team'
            }
          ];
        }
      }
    );
    await sendEmail(email, [], [], subject, '', html, attachment);

    return true;
  } catch (err) {
    err.message = 'There was an error while sending the verification email.';
    throw err;
  }
};

module.exports = {
  sendGreetingEmail
};

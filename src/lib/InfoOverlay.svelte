<script lang="ts">
  import { infoOverlayVisible } from '../stores';
  import CloseButton from './CloseButton.svelte';

  let root: HTMLDivElement;
  let active_tab = localStorage.getItem('active_tab')
    ? Number(localStorage.getItem('active_tab'))
    : 1;
  function closeInfoOverlay() {
    infoOverlayVisible.update(() => false);
    localStorage.removeItem('active_tab');
  }

  function showTabState(parameter: number) {
    active_tab = parameter;
    root.scrollTop = 0;
  }
</script>

<aside class="overlay overlay--info" bind:this={root}>
  <CloseButton functionOnClick={closeInfoOverlay}
    >close info overlay</CloseButton
  >

  <div class="header__menu__margin">
    <div class="info__tabs first__row">
      <button class:active={active_tab == 1} on:click={() => showTabState(1)}
        >Que é isto?
      </button>
      <button
        class:active={active_tab == 2}
        style="border-right: 1px solid black;"
        on:click={() => showTabState(2)}
        >Quen somos
      </button>
    </div>
    <div class="info__tabs">
      <button class:active={active_tab == 3} on:click={() => showTabState(3)}
      >Política de privacidade
      </button>
      <button
        class:active={active_tab == 4}
        style="border-right: unset;"
        on:click={() => showTabState(4)}
      >Contacto
      </button>
    </div>
  </div>
  <CloseButton functionOnClick={closeInfoOverlay}
    >Pechar</CloseButton
  >
  <div class="overlay__outer">
    <div class="overlay__content">
      <section style={active_tab !== 1 ? 'display: none;' : ''}>
        <h2 style="border-top: 0px;">Por que poñemos o foco nas vivendas destinadas ao aluguer turístico? </h2>
        <div class="overlay__section-text">
          <p>
            O aumento de pisos destinados ao alugueiro turístico ilustran perfectamente as dinámicas socio-económicas descritas nos puntos anteriores. A Coruña é, cada vez menos, unha urbe encamiñada a satisfacer as necesidades das persoas que viven e traballan na Coruña. É, cada vez máis, unha vila orientada a satisfacer as preferencias de consumo de persoas cun alto poder adquisitivo. Os problemas de vivenda que padecemos non son froito dunha escaseza de vivenda real, senón de unha distribución das mesmas coma un ben de mercado. Mentres os turistas atopan, sen moito problema, lugares onde hospedarse, somos quen vivimos e traballamos na Coruña quen nos enfrontamos as dinámicas de expulsión da cidade. Este modelo de turismo afecta directamente ao noso dereito á vivenda, pero ademais deixa un saldo laboral paupérrimo, xa que ofrece moitas menos saídas laborais que o modelo turístico baseado en hoteis e negocios destinados á hospedaxe.
          </p>
        </div>
      </section>
      
      <section style={active_tab !== 2 ? 'display: none;' : ''}>
        <h2>Por que na Falperra e Os Mallos?</h2>
        <div class="overlay__section-text">
          <p>
            Os Mallos e a Falperra son dous barrios históricos da Coruña, construídos a raíz da emigración rural da segunda metade do S.XX. Forman parte dos barrios "aluvión", denominados así pola catidade de poboación campesiña e obreira que foron acubillando durante ese período histórico. Durante moitas décadas os distritos próximos ás rondas de circunvalación da Coruña deron residencia á poboación chegada recentemente á cidade que procuraba un lugar onde vivir a un prezo asequíbel. Sen embargo, as transformacións destes últimos anos entorno á vivenda está a expulsar destes e doutros moitos barrios da Coruña tanto aos seus habitantes de toda a vida como ás familias migrantes que se asentan aquí porque noutras zonas da cidade os seus ingresos non lles alcanzan para pagar un aluguer. Tanto Os Mallos como A Falperra son claros exemplos da evolución das prácticas rentistas na nosa cidade. Exemplos de unha maquinaria urbana destinada á circulación de rendas desde os niveis máis baixos da pirámide social cara os chanzos superiores, incapaz de garantir os nosos dereitos máis básicos.
          </p>

<!--          <div class="partial_div-numbered">
            <span>1</span>
            <p>
              Comprobar se é certo <br />
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div class="partial_div-numbered">
            <span>2</span>
            <p>
              Que non sexa ofensivo <br />
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
            </p>
          </div>
          <div class="partial_div-numbered">
            <span>3</span>
            <p>
              Que non sexa Spam <br />
              Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div> 

          <p style="margin-top: 0px;">
            The moderation process is to ensure the safety of the map, and is
            not about policing expressions or identities.
          </p> -->
          <p>
            Non falamos so de vivenda. Tanto Os Mallos como a Falperra presentan un déficit escandaloso no que respecta a zonas verdes, espazos de lecer, lugares onde a veciñanza puidese xuntarse e desfrutar do seu tempo e espazo en colectivo. Este deseño urbanístico tampouco é unha casualidade. Correspéndese coa idea de cidade compacta froito das xeiras de promoción inmobiliaria da segunda metade do S.XX, que remataron por fomentar prácticas altamente especulativas. A noción do solo urbano coma un ben de mercado rematou por crear barrios de asfalto e formigón pensados como bens residenciais, pero non como espazos para a cidadanía.
          </p>
        </div>

        <h2>Por que un Sindicato de Barrio? </h2>
        <div class="overlay__section-text removal_textarea">
          <p>
            Xunto coas dinámicas de expulsión dos nosos barrios históricos, a ausencia de unha administración pública efectiva que asegure o dereito á vivenda obríganos, a quen padecemos esta situación, a organizarnos por nós mesmas. A forma de Sindicato de Barrio é unha configuración innovadora neste ámbito que coloca en primeiro lugar o dereito a habitar os barrios históricos da cidade. Fronte a uns poderes institucionais e económicos que ensalzan o dereito á propiedade privada como o único dereito que debe ser salvagardado opoñemos o dereito a unha vivenda, as garantías para unha vida digna e a obriga por parte das institucións de orientar a riqueza cara o interese xeral.
          </p>
        </div>
      </section>
      
      <section style={active_tab !== 3 ? 'display: none;' : ''}>
        <h2>Política de privacidade</h2>
        <div class="privacy_policy overlay__section-text">
          <p><small>Last Updated on April 15, 2024</small></p>

          <p>
            This Privacy Policy outlines the collection, use, disclosure, and
            protection of your information when you access and use our platform.
            Your privacy is crucial to us, and we are committed to maintaining
            the confidentiality and security of the information you provide. By
            using Queering the Map, you acknowledge that you have read and
            understood this Privacy Policy. Your continued use of the platform
            constitutes acceptance of any updates or changes to this policy. If
            you do not agree to this Privacy Policy, do not use Queering the
            Map.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            User Content: Users may voluntarily provide User Content, such as
            personal stories, experiences, and other content, in text format.
          </p>
          <p>
            Location Data: Users may voluntarily select a location on the map
            where they would like their User Content to appear. We do not
            collect information about users' actual location.
          </p>
          <p>
            Time Data: We collect the time that a user's submission is made.
            This is so that we can organize submissions chronologically in our
            database.
          </p>

          <!-- <p>
            Email Addresses: We collect user’s email addresses if they directly
            contact us through email, or use the Request for Removal form. We do
            not collect email addresses when a user submits User Content. We do
            not share email addresses with any third parties.
          </p> -->
          <h2>2. Use of Information</h2>
          <p>
            Platform Functionality: We use the information collected to provide
            and improve the functionality of Queering the Map, allowing users to
            share and explore LGBTQ2IA+ experiences globally.
          </p>

          <p>
            Research and Dissemination: We may analyze and use aggregated,
            non-personal data for research and artistic purposes to enhance the
            platform's overall experience and mission.
          </p>

          <h2>3. Disclosure of Information</h2>
          <p>
            Anonymity: Users contribute anonymously if they choose not to
            associate their contributions with identifiable information. Users
            cannot create accounts, so no usernames, passwords, phone numbers,
            email addresses or social media handles are associated with
            contributions. We moderate all contributions for breaches of
            anonymity.
          </p>

          <p>
            Legal Compliance: We may disclose information in response to legal
            processes or when required to comply with applicable laws,
            regulations, or government requests.
          </p>

          <h2>4. Third-Party Services</h2>
          <p>
            Queering the Map may use third-party services for analytics,
            hosting, and other functionalities. These services may have their
            own privacy policies, and users are encouraged to review them.
          </p>

          <h2>5. Security</h2>
          <p>
            We implement reasonable measures to protect the information we
            collect from unauthorized access, disclosure, or alteration.
            However, no data transmission over the internet is entirely secure,
            and we cannot guarantee absolute security.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Queering the Map is intended for users aged 13 and older. We do not
            knowingly collect information from individuals under the age of 13.
          </p>

          <h2>7. Changes to This Privacy Policy</h2>

          <p>
            We reserve the right to update or change our Privacy Policy at any
            time. Any changes will be effective immediately upon posting the
            updated Privacy Policy on the platform.
          </p>

          <h2>8. Preteens And Users Under 18</h2>
          <p>
            For answers to any questions you may have about our Terms of Use,
            email us at <a href="mailto:hi@queeringthemap.com"
              >hi@queeringthemap.com</a
            >.
          </p>
        </div>
      </section>
      
      <section style={active_tab !== 4 ? 'display: none;' : ''}>
        <h2>Contacto</h2>
        <div class="overlay__section-text">
          <p>
            Inda non temos un correo ou non sei se queredes usar algún que xa tedes
          </p>
          <p>
            O mesmo coas redes sociais
          </p>
        </div>
      </section>
    </div>
    <div class="footer__menu__margin">
      <div class="info__tabs first__row">

    </div>
  </div>
</aside>

<style>
  a {
    cursor: pointer;
  }
  ul {
    list-style-type: disc;
    margin-top: -5px;

    padding-right: 1em;
  }
  ul.voidcircle li {
    margin-top: -5px;
    padding-bottom: 10px;
  }
  ul.voidcircle {
    padding-left: 3.5em;
    padding-right: 1.5em;
    list-style-type: circle;
  }
  .__press h2.divider {
    border-top: 1.01px solid var(--color-dark);
    padding-top: 1em;
    padding-left: 2.05rem;
    font-weight: bold !important;
  }
  .__press {
    display: flex;
    flex-direction: column;
  }
  .__press span {
    padding-left: 10px;
    margin-top: 10px;
    display: none;
    /* hides press names */
  }
  .__press a {
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0px;
    font-size: 15px;
  }
  .__press h2 {
    font-size: 15.1px;
    border-top: 0px;
    padding-top: 4px;
    padding-left: 1em;
    padding-bottom: 0px;
    margin-bottom: 0px;
    font-weight: 400 !important;
  }
  .footer__menu__margin {
    margin-top: 20px;
    width: calc((40vw));
    position: sticky;
    bottom: 0px;
    background: var(--color-green);
  }
  .header__menu__margin {
    width: calc((40% - 43px));
    left: 54px;
    position: fixed;
    background: var(--color-green);
  }

  .info__tabs {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;
  }
  .info__tabs button {
    width: 50%;
    border: 1.01px solid var(--color-dark);
    height: 22.5px;
    font-size: 0.9rem;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    color: var(--color-dark);
  }
  .info__tabs button.active {
    background-color: var(--color-dark);
    color: var(--color-green);
  }
  .info__tabs button:hover {
    background-color: black;
    color: var(--color-green);
    transition-duration: 300ms;
    transition-timing-function: ease;
  }
  .info__tabs button:nth-child(odd) {
    border-left: 0px solid black;
    border-right: unset;
  }

  .info__tabs.first__row button {
    border-bottom: 0px;
  }
  .partial_div-numbered {
    display: flex;
    gap: 8px;
  }
  .partial_div-numbered p {
    margin-top: 0px;
  }
  .partial_div-numbered span {
    border: 1.01px solid var(--color-dark);
    border-radius: 50%;
    min-width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlay {
    height: 100%;
    position: fixed;
    z-index: var(--overlay-z-index);
    top: 0;
    background-color: var(--color-green);
    overflow-x: hidden;
  }

  .overlay__outer section p {
    padding-left: 1em;
    padding-right: 1em;
  }
  .overlay__outer section ul p {
    padding-left: 0em;
    padding-right: 0em;
  }

  .overlay__outer section .donate_button {
    width: calc(100% - 2em);
    margin: auto;
    display: flex;
    justify-content: center;
  }

  section {
    margin-top: 2em;
  }

  h2 {
    text-decoration: none;
    font-size: 15px;
    color: var(--color-dark);
    display: block;
    font-weight: 500;
    padding-bottom: 4px;
    border-top: 1px solid var(--color-dark);
    padding-left: 2.05rem;
  }
  .overlay__content h2 {
    font-weight: bold;
    font-size: 15px;
  }
  @media (min-width: 800px) {
    h2 {
      font-size: 15px;
      padding-top: 1em;
    }
  }

  .overlay__section-text {
    text-decoration: none;
    color: var(--color-dark);
    display: block;
    margin-top: 1em;
    font-size: 15px;
  }

  .overlay__section-text > *:first-child {
    margin-top: 0;
  }

  .overlay__section-text > *:last-child {
    margin-bottom: 0;
  }

  a {
    text-decoration: underline;
    text-decoration-color: var(--color-dark);
    color: var(--color-dark);
  }

  a:not(.closebtn):hover,
  a:not(.closebtn):focus {
    color: var(--color-green-bright);
    text-decoration-color: var(--color-green-bright);
  }

  .overlay--info {
    left: 0;
    z-index: 99999;
  }
  .overlay--info::-webkit-scrollbar {
    display: none;
  }

  .overlay--info {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .overlay__outer {
    padding-top: 11px;
  }
  @media (max-width: 800px) {
    h2 {
      padding-top: 1.05em;
      padding-bottom: 0px;
    }
    .overlay--info {
      margin-top: 9px;
      margin-left: 9px;
      margin-right: 9px;
      max-height: 98vh;
      background: transparent;
      width: calc(100vw - 18px);
    }
    .overlay__outer {
      background: var(--color-green);
      border: 1.01px solid var(--color-dark);
      border-bottom: 0px;
    }
    .header__menu__margin {
      width: calc((100% - 63px));
      left: 54px;
    }
    .footer__menu__margin {
      width: 100%;
    }
  }

  @media (min-width: 800px) {
    .overlay__outer {
      width: calc(40vw);
      padding-top: 12px;
    }

    .overlay--info {
      left: 9px;
      top: 9px;
      border-right: var(--color-dark) solid 1px;
      border-left: var(--color-dark) solid 1px;
      box-shadow: 4px 0px 6px 0px rgba(0, 0, 0, 0.5);
      max-height: calc(100vh - 18px);
      height: unset;
    }

    .overlay__content {
      margin: 0;
      height: 125%;
    }
  }

</style>

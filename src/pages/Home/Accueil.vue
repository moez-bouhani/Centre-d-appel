<template>
  <div class="fullwidhth">
    <section id="intro">
      <div class="intro-text">
        <p>
          <i class="ion-android-checkmark-circle"></i> Trouver une solution à
          prendre un rendez-vous en ligne.
        </p>
        <p>
          <i class="ion-android-checkmark-circle"></i> Ganyer beaucoup de temps.
        </p>
        <p>
          <i class="ion-android-checkmark-circle"></i> Chercher des médecins.
        </p>

        <router-link to="/inscription">
          <button
            class="btn-get-started scrollto"
            style="background-color: #181f29eb"
          >
            S'inscrire maintenant !
          </button>
        </router-link>
      </div>
    </section>
    <!-- #intro -->
    <!--==========================
      Product Featuress Section
    ============================-->
    <section id="features">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-5 features-img">
           <!--  <img
              style="height: 361px"
              src="../assets/img/deppanneur-pannetn-accueil-tunisie2.png"
              class="wow fadeInLeft"
            /> -->
          </div>

          <div class="col-lg-8 col-md-7">
            <div class="row">
              <div class="col-lg-6 col-md-6 box wow fadeInRight">
                <div class="icon">
                  <i class="ion-man"></i>
                  <i class="ion-man"></i>
                  <i class="ion-man"></i>
                </div>
                <h4 class="title">
                  <a href>Des médecin expérimentés</a>
                </h4>
                <p class="description">
                  La planification en libre-service fournit aux patients une
                  meilleure expérience de service
                </p>
              </div>
              <div
                class="col-lg-6 col-md-6 box wow fadeInRight"
                data-wow-delay="0.1s"
              >
                <div class="icon">
                  <i class="ion-ios-stopwatch-outline"></i>
                </div>
                <h4 class="title">
                  <a href>Service Rapide</a>
                </h4>
                <p class="description">
                  La planification optimisée et une meilleure préparation des
                  patients avant leur rendez-vous améliorent la qualité du
                  traitement
                </p>
              </div>
              <div
                class="col-lg-6 col-md-6 box wow fadeInRight"
                data-wow-delay="0.2s"
              >
                <div class="icon">
                  <i class="ion-person"></i>
                </div>
                <h4 class="title">
                  <a href>Eefficacité du personnel</a>
                </h4>
                <p class="description">
                  Réduit les couts opérationnels à travers une programmation de
                  patients simplifiée et l'amélioration de l'efficacité du
                  personnel.
                </p>
              </div>
              <div
                class="col-lg-6 col-md-6 box wow fadeInRight"
                data-wow-delay="0.3s"
              >
                <div class="icon">
                  <img
                    src="https://img.icons8.com/cute-clipart/64/000000/pay-date.png"
                  />
                </div>
                <h4 class="title">
                  <a href>Service planifié et organisé</a>
                </h4>
                <p class="description">
                  Fournit une plateforme unifiée de planification pour tous les
                  canaux de prise de rendez-vous et le libre-service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- #features -->
    <main id="main">
      <!--==========================
      About Us Section
      ============================-->

      <!-- #about -->
      <!--==========================
      Call To Action Section
      ============================-->
      <section id="call-to-action">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 text-center text-lg-left">
              <h3 class="cta-title">Prendre Rendez-vous:</h3>
              <h5 class="cta-text">
                Vous souhaitez avoir plus d'information sur nos soins et notre
                prise en charge durant votre séjour ? n'hésitez pas à nous
                contacter et de planifier un RDV .
              </h5>
            </div>
            <div class="col-lg-3 cta-btn-container text-center">
              <router-link
                to="/inscription"
                class="cta-btn align-middle"
                style="background-color: #181f29eb"
              >
                Rendez vous</router-link
              >
            </div>
          </div>
        </div>
      </section>

      <!--==========================
      More Features Section
      ============================-->
      <section id="more-features" class="section-bg">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="box wow fadeInLeft">
                <div class="icon">
                  <img
                    src="https://img.icons8.com/plasticine/100/000000/medical-doctor.png"
                  />
                </div>
                <h4 class="title">
                  <a href>SERVICE D’UROLOGIE .</a>
                </h4>
                <p class="description">
                  Le service assure la prise en charge des maladies et
                  dysfonctionnements de l’appareil urinaire. Il dispose en outre
                  d’un lithotripteur, unique au sud-ouest de la Tunisie,
                  permettant l’élimination des calculs rénaux sans avoir recours
                  à la chirurgie.
                </p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInRight">
                <div class="icon">
                  <img
                    src="https://img.icons8.com/flat-round/64/000000/caduceus.png"
                  />
                </div>
                <h4 class="title">
                  <a href>CENTRE D`IMAGERIE.</a>
                </h4>
                <p class="description">
                  Ouvert 24h/24h et 7j/7j aux consultations externes, aux
                  patients hospitalisés et aux patients nécessitant des soins
                  d’urgence, le service d’imagerie médicale offre tous les
                  moyens existants en termes de dépistage.
                </p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInLeft">
                <div class="icon">
                  <img
                    src="https://img.icons8.com/color/48/000000/doctor-giving-advice.png"
                  />
                </div>
                <h4 class="title">
                  <a href>SERVICE DE RÉANIMATION.</a>
                </h4>
                <p class="description">
                  Un service de réanimation polyvalente doté de 05 lits,
                  permettant au personnel médical et paramédical de faire face à
                  toutes les situations d’insuffisances organiques,
                  chirurgicales ou médicales, adultes ou pédiatriques.
                </p>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="box wow fadeInRight">
                <div class="icon">
                  <img
                    src="https://img.icons8.com/color/48/000000/doctor-female.png"
                  />
                </div>
                <h4 class="title">
                  <a href>BLOCS OPÉRATOIRES.</a>
                </h4>
                <p class="description">
                  Salles d’opérations aseptiques dont une salle hyper propre
                  dédiée à la chirurgie cardiaque entièrement équipés et dédiés
                  à l’accueil des patients nécessitant une prise en charge
                  complexe ou une surveillance accrue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
export default {
  name: "Accueil",
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.imgheader {
  /* background-image: url("~@/assets/imgAccueil/header.jpg"); */
  background-image: url("/public/imgPfe/ARnPjJG3Hb.jpg");
}
.fullwidhth {
  padding-right: -60px !important;
  padding-left: -60px !important;
}
</style>
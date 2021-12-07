import theme from '../../theme';
import { useNavigate } from 'react-router';
import GitHubIcon from '@mui/icons-material/GitHub';
import BasicLayout from '../../layouts/basic-layout';
import image from '../../resources/images/test-image.png';
import { Button, ButtonBase, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Stack, Typography } from '@mui/material';

/**
 * Projects screen component
 */
export default function ProjectsScreen() {

  const navigateFunction = useNavigate();

  const navigate = (project: object) => () => {
    navigateFunction("/project-details", { state: { project: project } });
  }

  const shorten = (html: string) => {
    return `${stripHtml(html).slice(0, 115)}... `;
  }

  const stripHtml = (html: string): string => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const renderProjectCards = () => {
    const projects = Array.from(new Array(6)).map((project, index) => ({
      id: index,
      title: "Projektin nimi",
      image: image,
      text: `<p class="paragraph">– Meidän työelämän historiasta valtaosa on kuitenkin sellaista aikaa, kun vapaa-ajalla työntekijöihin ei otettu yhteyttä ollenkaan, Koskinen muistuttaa.</p><p class="paragraph">Kyseessä on Koskisen mukaan kuitenkin melko uusi ilmiö työelämässä.</p><p class="paragraph">– Se (yhteyden ottaminen vapaa-ajalla) on koko ajan kuitenkin lisääntynyt ja muuttunut ongelmalliseksi esimerkiksi työajan pitkittymisen ja työ- ja vapaa-ajan sekoittumisen näkökulmasta, Koskinen kertoo.</p><p class="paragraph">Koskinen näkeekin lakimuutokselle tarvetta myös Suomessa.</p><p class="paragraph">– Jos kehitys on sellaista, mitä se on nyt viimeisinä vuosina ollut, niin työsuojelullisista syistä kiellon säätäminen laissa olisi aivan mietittävä asia, Koskinen sanoo.</p><h3 class="subheadline">Euroopan maissa kielletty</h3><p class="paragraph">Työnantaja ei saa ottaa yhteyttä työntekijöihinsä enää ainakaan <a href="https://www.theguardian.com/lifeandstyle/2021/nov/15/portugal-boss-texts-work-us-employment" rel="noopener">Ranskassa, Saksassa, Italiassa ja Belgiassa.</a> Viimeisimpänä maana myös <a href="https://edition.cnn.com/2021/11/11/success/portugal-employer-contact-law/index.html" rel="noopener">Portugali liittyi</a> yhteydenotot kieltävien maiden listalle.</p><p class="paragraph">Maa hyväksyi lain, joka kieltää esihenkilöitä esimerkiksi soittamasta tai laittamasta viestiä työntekijöilleen, jotka ovat vapaalla. Lain rikkomisesta voi seurata jopa sakkorangaistus.</p><p class="paragraph">Lakimuutoksen yhteydessä portugalilaisilla on myös oikeus kieltäytyä etätyöstä ja työnantajalla on velvollisuus kustantaa työntekijän etätyöhön liittyvät kulut, kuten tarvittavat työvälineet.</p><p class="paragraph">Ranskan työaikalain mukaan työntekijöitä ei voi enää vaatia olemaan sähköpostitse tavoitettavissa vapaa-ajalla. Ranskalaisilla on myös oikeus sulkea työsähköposti vapaa-ajalla.</p>`,
      github: "#"
    }));

    return projects.map((project, index) => (
      <Grid key={index} item md={4} sm={6} xs={12}>
        <Card>
          <CardHeader title={project.title} />
          <CardMedia component="img" image={project.image} height={210} />
          <CardContent>
            <Typography component="span">
              {shorten(project.text)}
            </Typography>
            <ButtonBase sx={{ color: theme.palette.primary.main }} onClick={navigate(project)}>
              <Typography component="span">
                Lue lisää
              </Typography>
            </ButtonBase>
          </CardContent>
          <CardActions sx={{ pt: 0, pb: 2, justifyContent: "center" }}>
            <Button href={project.github} color="inherit" variant="outlined" sx={{ textTransform: "none" }}>
              <Stack direction="row" spacing={1}>
                <GitHubIcon />
                <Typography>GitHub</Typography>
              </Stack>
            </Button>
          </CardActions>
        </Card>
      </Grid>
    ));
  }

  return (
    <BasicLayout>
      <Grid container spacing={2}>
        {renderProjectCards()}
      </Grid>
    </BasicLayout>
  );

}
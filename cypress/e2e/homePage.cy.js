describe('Home page display', () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it('Should show correct number of days', () => {
    cy.fixture('testData').then((testData) => {
      cy.fixture('selectors').then((selectors) => {
        cy.get(selectors.homePage.nav.day)
          .should('have.length', testData.homePage.expectedDaysCount);
        });
      });
    });

    it('Should be a title', () => {
    cy.fixture('testData').then((testData) => {
      cy.contains(testData.homePage.header.title).should('be.visible');
    });
  });

  it('Should be a list of movies', () => {
    cy.fixture('selectors').then((selectors) => {
      cy.get(selectors.homePage.movies.movie).should('be.visible');
    });
  });

  it('Should display Stalker movie information', () => {
    cy.fixture('testData').then((testData) => {
      cy.fixture('selectors').then((selectors) => {
        const movieSelectors = selectors.homePage.movies;
        const movieList = testData.homePage.movies;

        cy.contains(movieSelectors.title, movieList.witcher.title).parents(movieSelectors.movieDescription).within(() => {
          cy.get(movieSelectors.title).should('be.visible');
          cy.get(movieSelectors.synopsis).should('be.visible');
          cy.get(movieSelectors.duration).should('be.visible');
          cy.get(movieSelectors.origin).should('be.visible');
        });
      });
    });
  });
});
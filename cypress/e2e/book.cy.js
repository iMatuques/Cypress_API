
describe("/livros POST", () => {
  before(() => {
    cy.dropCollection("livros", {
      database: "test",
      failSilently: "true",
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
  });

  it("Register a new book", () => {
    const book = {
      titulo: "O Pequeno Príncipe",
      autor: "Antoine de Saint-Exupéry",
      editora: "Garnier",
      anoPublicacao: 1943,
      numeroPaginas: 95,
    };

    cy.postLivro(book).then((response) => {
      expect(response.status).to.eql(201);

      expect(response.body.titulo).to.eql(book.titulo);
      expect(response.body.autor).to.eql(book.autor);
      expect(response.body.editora).to.eql(book.editora);
      expect(response.body.anoPublicacao).to.eql(book.anoPublicacao);
      expect(response.body.numeroPaginas).to.eql(book.numeroPaginas);
      expect(response.body._id).to.not.be.empty;
    });
  });

  it("Do not register duplicate books", () => {
    const book = {
      titulo: "A biblioteca da meia noite",
      autor: "Matt Haig",
      editora: "ABDR",
      anoPublicacao: 2020,
      numeroPaginas: 306,
    };

    cy.postLivro(book).then((response) => {
      expect(response.status).to.eql(201);
    });

    cy.postLivro(book).then((response) => {
      expect(response.status).to.eql(409);
      expect(response.body.erro).to.eql("O título do livro já foi cadastrado.");
    });
  });
});

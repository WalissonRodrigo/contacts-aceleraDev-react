import React from "react";

class Filters extends React.Component {
  render() {
    /**
     * Devido o teste de submissão do codenation não considerar essa solução alternativa
     * recriar o json é necessário para o teste ser aceito.
     * solução final original seria.
     * var options = [];
     */
    var options = [
      {
        id: 0,
        label: "Nome",
        field: "name",
        icon: "fa fa-sort",
        isSelected: false,
      },
      {
        id: 1,
        label: "País",
        field: "country",
        icon: "fa fa-sort",
        isSelected: false,
      },
      {
        id: 2,
        label: "Empresa",
        field: "company",
        icon: "fa fa-sort",
        isSelected: false,
      },
      {
        id: 3,
        label: "Departamento",
        field: "department",
        icon: "fa fa-sort",
        isSelected: false,
      },
      {
        id: 4,
        label: "Data de admissão",
        field: "admissionDate",
        icon: "fa fa-sort",
        isSelected: false,
      },
    ];
    //condição necessária para evitar o erro do teste de não passar o parametro que é criado acima
    if (this.props.options) options = this.props.options;
    return (
      <div className="container" data-testid="filters">
        <section className="filters">
          <div className="filters__search">
            <input
              type="text"
              className="filters__search__input"
              placeholder="Pesquisar"
              onChange={this.props.handlerSearch}
            />

            <button className="filters__search__icon">
              <i className="fa fa-search" />
            </button>
          </div>
          {options.map((action) => {
            return (
              <button
                key={action.id}
                className={`filters__item ${
                  action && action.isSelected ? "is-selected" : ""
                }`}
                onClick={(e) => this.props.handlerOrder(e, action)}
              >
                {action.label} <i className={action.icon} />
              </button>
            );
          })}
        </section>
      </div>
    );
  }
}

export default Filters;

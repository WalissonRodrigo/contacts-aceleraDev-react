import React from "react";
import "./App.scss";
import Topbar from "./components/Topbar";
import Filters from "./components/Filters";
import Contacts from "./components/Contacts";
import Contact from "./components/Contact";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      jsonContacts: [],
      orderBy: true,
      options: [
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
      ],
    };
    this.handlerSearch = this.handlerSearch.bind(this);
    this.handlerOrder = this.handlerOrder.bind(this);
  }
  componentDidMount() {
    /** Realizar a chamada da api */
    fetch(`https://5e82ac6c78337f00160ae496.mockapi.io/api/v1/contacts`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          contacts: response,
          jsonContacts: response,
        });
      });
  }
  handlerSearch(e) {
    /** Realiza a busca pelo valor do input aproveitando o evento change */
    //filtro por regex para encontrar qualquer correspondencia com qualquer coluna
    const contactsFiltered = this.state.jsonContacts.filter((contact) => {
      let name = new RegExp(e.target.value, "i").test(contact.name);
      let phone = new RegExp(e.target.value, "i").test(contact.phone);
      let country = new RegExp(e.target.value, "i").test(contact.country);
      let admissionDate = new RegExp(e.target.value, "i").test(
        contact.admissionDate
      );
      let company = new RegExp(e.target.value, "i").test(contact.company);
      let department = new RegExp(e.target.value, "i").test(contact.department);
      return name || phone || country || admissionDate || company || department;
    });
    this.setState({
      contacts: contactsFiltered,
    });
  }
  handlerOrder(e, action) {
    /** Realiza a ordenação pelo action (botão clicado) aproveitando o evento de click */
    e.preventDefault();
    let options = this.state.options;
    let orderBy = this.state.orderBy;
    //localiza o index do ultimo botão ativo
    let indexActiveButton = options.findIndex((item) => item.isSelected);
    //reseta todos os botões para evitar deixar os botões errados ativos e com icones errados. Exceto o botão selecionado
    options
      .filter((item) => item.isSelected)
      .forEach((change) => {
        change.isSelected = false;
        change.icon = "fa fa-sort";
      });
    //caso não tenha nenhum botao ativo ainda
    if (indexActiveButton < 0) {
      orderBy = true;
    } else {
      //verifica se o ID não mudou para trocar a ordenação de preferência
      if (options[indexActiveButton].id === action.id) orderBy = !orderBy;
    }
    //ativa novamente o botão clicado
    options[action.id].isSelected = true;
    //altera o icone de acordo com a necessidade da ordenação
    options[action.id].icon = orderBy ? "fas fa-sort-up" : "fas fa-sort-down";
    //Essa sera a etapa onde sera feita a ordenação da lista de acordo com a coluna e ascendência
    const contactsOrdered = this.sortBy(
      this.state.contacts,
      action.field,
      orderBy
    );
    //atualiza os estados para refletir as mudanças
    this.setState({
      options: options,
      orderBy: orderBy,
      contacts: contactsOrdered,
    });
  }

  sortBy(list, columnOrder, orderBy) {
    return list.sort((colX, colY) => {
      if (orderBy) {
        //ordena asc
        return colX[columnOrder] < colY[columnOrder]
          ? -1
          : colX[columnOrder] > colY[columnOrder]
          ? 1
          : 0;
      } else {
        //ordena desc
        return colX[columnOrder] > colY[columnOrder]
          ? -1
          : colX[columnOrder] < colY[columnOrder]
          ? 1
          : 0;
      }
    });
  }
  render() {
    return (
      <div className="app" data-testid="app">
        <Topbar />
        <Filters
          options={this.state.options}
          handlerSearch={this.handlerSearch}
          handlerOrder={this.handlerOrder}
        />
        <Contacts>
          {this.state.contacts.map((contact, key) => (
            <Contact key={key} data={contact} />
          ))}
        </Contacts>
      </div>
    );
  }
}

export default App;

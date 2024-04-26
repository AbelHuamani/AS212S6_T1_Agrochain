// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MiContrato {
    // Variables de estado
    uint public miVariable; // Tipo de dato uint (entero sin signo)
    address public propietario; // Tipo de dato address (dirección de Ethereum)

    // Constructor
    constructor() {
        propietario = msg.sender; // msg.sender es la dirección que desplegó el contrato
    }

    // Funciones
    function setMiVariable(uint _miVariable) public {
        require(msg.sender == propietario); // Solo el propietario puede cambiar la variable
        miVariable = _miVariable;
    }

    // Funciones visibles para el usuario
    function getMiVariable() public view returns (uint) {
        return miVariable;
    }

    // Función payable
    function depositar() public payable {
        // La función puede recibir Ether
    }

    function getBalance() public view returns (uint) {
        return address(this).balance; // Devuelve el balance del contrato
    }

    // Función fallback
    fallback() external payable {
        // Se ejecuta si ninguna otra función coincide con la llamada
    }

    // Función receive
    receive() external payable {
        // Se ejecuta si se envía Ether al contrato sin datos
    }
}

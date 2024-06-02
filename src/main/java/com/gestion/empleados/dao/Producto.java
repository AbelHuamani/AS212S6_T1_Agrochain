package com.gestion.empleados.dao;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;


@Table(name = "Productos")
public class Producto {
    @Id
    private Long id;
    private String imagenurl;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private LocalDate fechainicio;
    private LocalDate fechaculminacion;
	private String telefono;
	private String ubicacion;
	private String wallet;
    private String estado;
    // Getters and setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getImagenurl() {
		return imagenurl;
	}
	public void setImagenurl(String imagenurl) {
		this.imagenurl = imagenurl;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public BigDecimal getPrecio() {
		return precio;
	}
	public void setPrecio(BigDecimal precio) {
		this.precio = precio;
	}
	public LocalDate getFechainicio() {
		return fechainicio;
	}
	public void setFechainicio(LocalDate fechainicio) {
		this.fechainicio = fechainicio;
	}
	public LocalDate getFechaculminacion() {
		return fechaculminacion;
	}
	public void setFechaculminacion(LocalDate fechaculminacion) {
		this.fechaculminacion = fechaculminacion;
	}
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	public String getUbicacion() {
		return ubicacion;
	}
	public void setUbicacion(String ubicacion) {
		this.ubicacion = ubicacion;
	}
	public String getWallet() {
		return wallet;
	}
	public void setWallet(String wallet) {
		this.wallet = wallet;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	
	
}
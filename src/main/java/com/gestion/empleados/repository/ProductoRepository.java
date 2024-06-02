package com.gestion.empleados.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.gestion.empleados.dao.Producto;

@Repository
public interface ProductoRepository extends ReactiveCrudRepository<Producto, Long> {
}
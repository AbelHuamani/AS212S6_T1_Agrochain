package com.gestion.empleados.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.gestion.empleados.dao.Producto;
import com.gestion.empleados.repository.ProductoRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@CrossOrigin(origins = "https://studious-goldfish-679x697q7xxhr7gq-4200.app.github.dev")
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productorepository;

    @GetMapping("/findAll")
    public Flux<Producto> getAllProductos() {
        return productorepository.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Producto> getProductoById(@PathVariable Long id) {
        return productorepository.findById(id);
    }

    @PostMapping
    public Mono<Producto> createProducto(@RequestBody Producto producto) {
        return productorepository.save(producto);
    }


    @PutMapping("/{id}/eliminar")
    public Mono<Producto> eliminarMenuById(@PathVariable Long id) {
        return productorepository.findById(id)
                .flatMap(m -> {
                    m.setEstado("I");
                    return productorepository.save(m);
                });
    }

    @PutMapping("/{id}/restaurar")
    public Mono<Producto> restaurarMenuById(@PathVariable Long id) {
        return productorepository.findById(id)
                .flatMap(m -> {
                    m.setEstado("A");
                    return productorepository.save(m);
                });
    }

    @PutMapping("/{id}")
    public Mono<Producto> updateProducto(@PathVariable Long id, @RequestBody Producto producto) {
        return productorepository.findById(id)
            .flatMap(existingProducto -> {
                existingProducto.setImagenurl(producto.getImagenurl());
                existingProducto.setNombre(producto.getNombre());
                existingProducto.setDescripcion(producto.getDescripcion());
                existingProducto.setPrecio(producto.getPrecio());
                existingProducto.setFechainicio(producto.getFechainicio());
                existingProducto.setFechaculminacion(producto.getFechaculminacion());
                existingProducto.setTelefono(producto.getTelefono());
                existingProducto.setUbicacion(producto.getUbicacion());
                existingProducto.setWallet(producto.getWallet());
                return productorepository.save(existingProducto);
            });
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteProducto(@PathVariable Long id) {
        return productorepository.deleteById(id);
    }
}

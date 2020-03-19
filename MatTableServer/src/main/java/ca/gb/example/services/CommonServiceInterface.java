package ca.gb.example.services;

import java.util.List;

import org.springframework.data.domain.Page;

public interface CommonServiceInterface<T> {

	public long count();
	
	public T find(String s);

	public T findById(Long id);
	
	public List<T> findAll();
	
	// public List<T> page(Integer pageNo, Integer pageSize, String sortBy);
	public Page<T> page(String filter, Integer pageNo, Integer pageSize, String sortBy, String sortOrder);

	public T save(T t);
	
	public void deleteAll();
	
	public void deleteById(Long id);
	
}

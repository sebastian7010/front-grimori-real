import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[] = [];
  filteredArticles: Article[] = [];
  categories: string[] = [];
  searchTerm = '';
  selectedCategory = '';

  // Variables para el menú desplegable de categorías
  showCategoriesDropdown = false;

  // Variables para controlar la vista ampliada del artículo
  selectedArticle: Article | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe(list => {
      this.articles = list;
      this.filteredArticles = list;
      this.categories = Array.from(new Set(list.map(a => a.category)));
    });
  }

  private applyFilters() {
    this.filteredArticles = this.articles.filter(a => {
      const matchesSearch = this.searchTerm
        ? a.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          (a.excerpt?.toLowerCase().includes(this.searchTerm.toLowerCase()) ?? false)
        : true;
      const matchesCategory = this.selectedCategory
        ? a.category === this.selectedCategory
        : true;
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onCategorySelect(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? '' : cat;
    this.applyFilters();
    this.showCategoriesDropdown = false; // Cierra el menú al seleccionar
  }

  toggleCategories() {
    this.showCategoriesDropdown = !this.showCategoriesDropdown;
  }

  // Método para abrir la vista ampliada del artículo
  openArticle(article: Article) {
    this.selectedArticle = article;
  }

  // Método para cerrar la vista ampliada del artículo
  closeArticle() {
    this.selectedArticle = null;
  }
}

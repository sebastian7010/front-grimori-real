import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { HttpClientModule } from '@angular/common/http';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxEditorModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  title = '';
  category = '';
  imageUrl = '';
  previewImageUrl = '';
  content = '';
  articles: Article[] = [];

  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image']
  ];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.editor = new Editor();
    this.loadArticles();
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe((arts) => {
      this.articles = arts;
    });
  }

  addArticle() {
    if (this.title && this.category && this.content) {
      const newArticle: Article = {
        title: this.title,
        category: this.category,
        imageUrl: this.imageUrl || this.previewImageUrl,
        content: this.content
      };
      this.articleService.createArticle(newArticle).subscribe((art) => {
        this.articles.unshift(art);
        // Limpiar formulario
        this.title = '';
        this.category = '';
        this.imageUrl = '';
        this.previewImageUrl = '';
        this.content = '';
      });
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
